
import React from 'react';
import ShopLayout from '@/layouts/shop-layout';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

    return (
        <ShopLayout title="Bem-vindo à nossa loja">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container px-4 py-24 sm:px-6 lg:px-8">
                    <div className="relative mx-auto max-w-xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                            Bem-vindo à nossa loja
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-blue-100">
                            Descubra produtos incríveis com os melhores preços e qualidade garantida.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link href="/products">
                                <Button size="lg" variant="secondary">
                                    Ver Produtos
                                </Button>
                            </Link>
                            <Link href="/categories">
                                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                                    Explorar Categorias
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16">
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                            Produtos em Destaque
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Confira nossa seleção especial de produtos
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {featuredProducts.map((product) => (
                            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                                <CardHeader className="p-0">
                                    <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                                        <img
                                            src={product.images[0] || '/images/placeholder-product.jpg'}
                                            alt={product.name}
                                            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <CardTitle className="text-lg font-semibold line-clamp-2">
                                        {product.name}
                                    </CardTitle>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                        {product.short_description}
                                    </p>
                                    <div className="mt-3 flex items-center gap-2">
                                        {product.sale_price ? (
                                            <>
                                                <span className="text-lg font-bold text-red-600">
                                                    {formatPrice(product.sale_price)}
                                                </span>
                                                <span className="text-sm text-gray-500 line-through">
                                                    {formatPrice(product.price)}
                                                </span>
                                                <Badge variant="destructive" className="text-xs">
                                                    OFERTA
                                                </Badge>
                                            </>
                                        ) : (
                                            <span className="text-lg font-bold">
                                                {formatPrice(product.price)}
                                            </span>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Link href={`/products/${product.slug}`} className="w-full">
                                        <Button className="w-full">
                                            Ver Produto
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/products">
                            <Button variant="outline" size="lg">
                                Ver Todos os Produtos
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="bg-gray-50 dark:bg-gray-900 py-16">
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                            Nossas Categorias
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Encontre exatamente o que você precisa
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/categories/${category.slug}`}
                                className="group"
                            >
                                <Card className="hover:shadow-lg transition-shadow">
                                    <CardHeader className="p-0">
                                        <div className="aspect-square overflow-hidden rounded-t-lg bg-gradient-to-br from-blue-400 to-purple-500">
                                            {category.image ? (
                                                <img
                                                    src={category.image}
                                                    alt={category.name}
                                                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-white text-2xl font-bold">
                                                    {category.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <CardTitle className="text-lg font-semibold">
                                            {category.name}
                                        </CardTitle>
                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                            {category.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </ShopLayout>
    );
}
