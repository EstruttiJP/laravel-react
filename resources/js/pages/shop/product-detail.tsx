
import React, { useState } from 'react';
import ShopLayout from '@/layouts/shop-layout';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Heart, Share2, Truck, Shield, RotateCcw, Star } from 'lucide-react';

interface ProductVariant {
    id: number;
    name: string;
    value: string;
    price_modifier: number;
    stock_quantity: number;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    short_description: string;
    price: number;
    sale_price?: number;
    images: string[];
    stock_quantity: number;
    sku: string;
    weight?: number;
    dimensions?: string;
    featured: boolean;
    variants: ProductVariant[];
    categories: Category[];
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface ProductDetailProps {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedVariants, setSelectedVariants] = useState<{[key: string]: string}>({});
    const [quantity, setQuantity] = useState(1);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const getCurrentPrice = () => {
        let price = product.sale_price || product.price;
        // Adicionar modificadores de variantes
        Object.values(selectedVariants).forEach(variantId => {
            const variant = product.variants.find(v => v.id.toString() === variantId);
            if (variant) {
                price += variant.price_modifier;
            }
        });
        return price;
    };

    const addToCart = () => {
        // Implementar lógica de adicionar ao carrinho
        console.log('Adicionando ao carrinho:', {
            product: product.id,
            variants: selectedVariants,
            quantity
        });
    };

    return (
        <ShopLayout title={`${product.name} - Loja Personalizável`}>
            <div className="container px-4 py-8 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8 text-sm">
                    <ol className="flex items-center space-x-2">
                        <li><Link href="/" className="text-blue-600 hover:text-blue-800">Início</Link></li>
                        <li>/</li>
                        <li><Link href="/products" className="text-blue-600 hover:text-blue-800">Produtos</Link></li>
                        {product.categories.map(category => (
                            <React.Fragment key={category.id}>
                                <li>/</li>
                                <li>
                                    <Link 
                                        href={`/categories/${category.slug}`}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            </React.Fragment>
                        ))}
                        <li>/</li>
                        <li className="text-gray-500">{product.name}</li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                            <img
                                src={product.images[selectedImage] || '/images/placeholder-product.jpg'}
                                alt={product.name}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square overflow-hidden rounded-md border-2 ${
                                            selectedImage === index 
                                                ? 'border-blue-500' 
                                                : 'border-gray-200'
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                {product.name}
                            </h1>
                            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                                {product.short_description}
                            </p>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                {formatPrice(getCurrentPrice())}
                            </span>
                            {product.sale_price && (
                                <span className="text-xl text-gray-500 line-through">
                                    {formatPrice(product.price)}
                                </span>
                            )}
                            {product.sale_price && (
                                <Badge variant="destructive">
                                    {Math.round(((product.price - product.sale_price) / product.price) * 100)}% OFF
                                </Badge>
                            )}
                        </div>

                        {/* Variants */}
                        {product.variants.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Opções</h3>
                                {product.variants.map((variant) => (
                                    <div key={variant.id}>
                                        <label className="block text-sm font-medium mb-2">
                                            {variant.name}
                                        </label>
                                        <Select
                                            value={selectedVariants[variant.name] || ''}
                                            onValueChange={(value) => 
                                                setSelectedVariants(prev => ({
                                                    ...prev,
                                                    [variant.name]: value
                                                }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={`Selecione ${variant.name}`} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={variant.id.toString()}>
                                                    {variant.value}
                                                    {variant.price_modifier !== 0 && (
                                                        <span className="ml-2 text-sm text-gray-500">
                                                            ({variant.price_modifier > 0 ? '+' : ''}
                                                            {formatPrice(variant.price_modifier)})
                                                        </span>
                                                    )}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Quantity and Add to Cart */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Quantidade</label>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </Button>
                                    <span className="w-12 text-center">{quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setQuantity(quantity + 1)}
                                        disabled={quantity >= product.stock_quantity}
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <Button 
                                    onClick={addToCart}
                                    className="flex-1"
                                    disabled={product.stock_quantity === 0}
                                    size="lg"
                                >
                                    {product.stock_quantity === 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
                                </Button>
                                <Button variant="outline" size="lg">
                                    <Heart className="h-5 w-5" />
                                </Button>
                                <Button variant="outline" size="lg">
                                    <Share2 className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Stock Status */}
                        <div className="text-sm">
                            {product.stock_quantity > 0 ? (
                                <span className="text-green-600">
                                    ✓ {product.stock_quantity} em estoque
                                </span>
                            ) : (
                                <span className="text-red-600">✗ Produto esgotado</span>
                            )}
                        </div>

                        {/* Features */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Truck className="h-5 w-5 text-gray-500" />
                                <span className="text-sm">Frete grátis para compras acima de R$ 99</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Shield className="h-5 w-5 text-gray-500" />
                                <span className="text-sm">Garantia de 1 ano</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <RotateCcw className="h-5 w-5 text-gray-500" />
                                <span className="text-sm">Troca gratuita em 30 dias</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Description */}
                <div className="mt-12">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold mb-4">Descrição do Produto</h2>
                            <div className="prose max-w-none dark:prose-invert">
                                <p>{product.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedProducts.slice(0, 4).map((relatedProduct) => (
                                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                                    <CardContent className="p-0">
                                        <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                                            <img
                                                src={relatedProduct.images[0] || '/images/placeholder-product.jpg'}
                                                alt={relatedProduct.name}
                                                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold line-clamp-2">{relatedProduct.name}</h3>
                                            <p className="mt-2 font-bold">
                                                {formatPrice(relatedProduct.sale_price || relatedProduct.price)}
                                            </p>
                                            <Link href={`/products/${relatedProduct.slug}`} className="mt-3 block">
                                                <Button variant="outline" size="sm" className="w-full">
                                                    Ver Produto
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </ShopLayout>
    );
}
