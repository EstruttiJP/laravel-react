
import React, { useState } from 'react';
import ShopLayout from '@/layouts/shop-layout';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter, Grid, List } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    slug: string;
    short_description: string;
    price: number;
    sale_price?: number;
    images: string[];
    featured: boolean;
    stock_quantity: number;
    categories: Category[];
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface ProductsProps {
    products: Product[];
    categories: Category[];
    filters: {
        search?: string;
        category?: string;
        sort?: string;
        min_price?: number;
        max_price?: number;
    };
}

export default function Products({ products, categories, filters }: ProductsProps) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Implementar lógica de busca via Inertia
    };

    return (
        <ShopLayout title="Produtos - Loja Personalizável">
            <div className="container px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        Nossos Produtos
                    </h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                        Descubra nossa coleção completa de produtos
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="mb-8 space-y-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="flex-1 max-w-lg">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="search"
                                    placeholder="Buscar produtos..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </form>

                        {/* View Toggle */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant={viewMode === 'grid' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'list' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setViewMode('list')}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4">
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas as categorias</SelectItem>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.slug}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Ordenar por" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name">Nome</SelectItem>
                                <SelectItem value="price_asc">Menor preço</SelectItem>
                                <SelectItem value="price_desc">Maior preço</SelectItem>
                                <SelectItem value="newest">Mais recentes</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            Filtros
                        </Button>
                    </div>
                </div>

                {/* Products Grid/List */}
                <div className={
                    viewMode === 'grid' 
                        ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        : "space-y-6"
                }>
                    {products.map((product) => (
                        <Card key={product.id} className={`group hover:shadow-lg transition-shadow ${
                            viewMode === 'list' ? 'flex flex-row' : ''
                        }`}>
                            <CardHeader className={`p-0 ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                                <div className={`overflow-hidden bg-gray-100 ${
                                    viewMode === 'list' 
                                        ? 'h-full rounded-l-lg' 
                                        : 'aspect-square rounded-t-lg'
                                }`}>
                                    <img
                                        src={product.images[0] || '/images/placeholder-product.jpg'}
                                        alt={product.name}
                                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </CardHeader>
                            <div className={viewMode === 'list' ? 'flex flex-col flex-1' : ''}>
                                <CardContent className="p-4 flex-1">
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
                                    {product.stock_quantity === 0 && (
                                        <Badge variant="secondary" className="mt-2">
                                            Esgotado
                                        </Badge>
                                    )}
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Link href={`/products/${product.slug}`} className="w-full">
                                        <Button 
                                            className="w-full" 
                                            disabled={product.stock_quantity === 0}
                                        >
                                            {product.stock_quantity === 0 ? 'Esgotado' : 'Ver Produto'}
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* No products found */}
                {products.length === 0 && (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Nenhum produto encontrado
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Tente ajustar seus filtros de busca
                        </p>
                    </div>
                )}
            </div>
        </ShopLayout>
    );
}
