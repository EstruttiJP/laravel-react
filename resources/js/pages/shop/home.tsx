
import React from 'react';
import ShopLayout from '@/layouts/shop-layout';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Shield, RotateCcw, Headphones, Star, ArrowRight } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    slug: string;
    short_description: string;
    price: number;
    sale_price?: number;
    images: string[];
    featured: boolean;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    image?: string;
}

interface HomeProps {
    featuredProducts: Product[];
    categories: Category[];
}

export default function Home({ featuredProducts, categories }: HomeProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const features = [
        {
            icon: Truck,
            title: "Frete Grátis",
            description: "Para compras acima de R$ 99"
        },
        {
            icon: Shield,
            title: "Compra Segura",
            description: "Pagamento 100% protegido"
        },
        {
            icon: RotateCcw,
            title: "Troca Garantida",
            description: "30 dias para trocar"
        },
        {
            icon: Headphones,
            title: "Suporte 24/7",
            description: "Atendimento sempre disponível"
        }
    ];

    return (
        <ShopLayout title="Loja Personalizável - Sua loja online completa">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container relative px-4 py-24 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                            Sua Loja
                            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                Personalizável
                            </span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-blue-100 sm:text-xl">
                            Descubra produtos incríveis com os melhores preços, qualidade garantida 
                            e uma experiência de compra totalmente personalizada para você.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/products">
                                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                                    Explorar Produtos
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/categories">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-blue-600">
                                    Ver Categorias
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center">
                                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                    <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16">
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                            Produtos em Destaque
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Nossa seleção especial dos melhores produtos com ofertas imperdíveis
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {featuredProducts.map((product) => (
                            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <CardHeader className="p-0">
                                    <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                                        <img
                                            src={product.images[0] || '/images/placeholder-product.jpg'}
                                            alt={product.name}
                                            className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {product.name}
                                    </CardTitle>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                        {product.short_description}
                                    </p>
                                    <div className="mt-3 flex items-center gap-2">
                                        {product.sale_price ? (
                                            <>
                                                <span className="text-xl font-bold text-red-600">
                                                    {formatPrice(product.sale_price)}
                                                </span>
                                                <span className="text-sm text-gray-500 line-through">
                                                    {formatPrice(product.price)}
                                                </span>
                                                <Badge variant="destructive" className="text-xs animate-pulse">
                                                    {Math.round(((product.price - product.sale_price) / product.price) * 100)}% OFF
                                                </Badge>
                                            </>
                                        ) : (
                                            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                                {formatPrice(product.price)}
                                            </span>
                                        )}
                                    </div>
                                    {/* Rating stars */}
                                    <div className="mt-2 flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${
                                                    i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                        <span className="ml-1 text-xs text-gray-500">(4.5)</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Link href={`/products/${product.slug}`} className="w-full">
                                        <Button className="w-full group-hover:bg-blue-700 transition-colors">
                                            Ver Produto
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/products">
                            <Button variant="outline" size="lg" className="hover:bg-blue-50 dark:hover:bg-blue-950">
                                Ver Todos os Produtos
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 py-16">
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                            Nossas Categorias
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Encontre exatamente o que você precisa navegando por nossas categorias organizadas
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/categories/${category.slug}`}
                                className="group"
                            >
                                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur">
                                    <CardHeader className="p-0">
                                        <div className="aspect-square overflow-hidden rounded-t-lg bg-gradient-to-br from-blue-400 to-purple-500 relative">
                                            {category.image ? (
                                                <img
                                                    src={category.image}
                                                    alt={category.name}
                                                    className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-white text-4xl font-bold">
                                                    {category.name.charAt(0)}
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/40 transition-colors" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <CardTitle className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                                            {category.name}
                                        </CardTitle>
                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                            {category.description}
                                        </p>
                                        <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                                            Explorar categoria
                                            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Pronto para começar?
                        </h2>
                        <p className="mt-4 text-lg text-blue-100">
                            Junte-se a milhares de clientes satisfeitos e descubra uma nova experiência de compra online.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/register">
                                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                                    Criar Conta Grátis
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-blue-600">
                                    Falar Conosco
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </ShopLayout>
    );
}
