import React from 'react';
import ShopLayout from '@/layouts/shop-layout';
import { Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
}

interface CategoriesProps {
    categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
    return (
        <ShopLayout title="Categorias - Loja Personalizável">
            <div className="container px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold mb-8">Categorias</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Card key={category.id}>
                            <CardHeader>
                                <CardTitle>{category.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{category.description}</p>
                                <Link href={`/products?category=${category.slug}`} className="text-blue-600 hover:underline mt-2 block">
                                    Ver produtos
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </ShopLayout>
    );
} 