
import React, { useState } from 'react';
import ShopLayout from '@/layouts/shop-layout';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

interface CartItem {
    id: number;
    product: {
        id: number;
        name: string;
        slug: string;
        price: number;
        sale_price?: number;
        images: string[];
    };
    variant?: {
        id: number;
        name: string;
        value: string;
    };
    quantity: number;
    unit_price: number;
    total_price: number;
}

interface CartProps {
    cartItems: CartItem[];
    cartTotal: number;
    shipping: number;
    tax: number;
    finalTotal: number;
}

export default function Cart({ cartItems, cartTotal, shipping, tax, finalTotal }: CartProps) {
    const [couponCode, setCouponCode] = useState('');

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const updateQuantity = (itemId: number, newQuantity: number) => {
        // Implementar lógica de atualização via Inertia
        console.log('Atualizando quantidade:', itemId, newQuantity);
    };

    const removeItem = (itemId: number) => {
        // Implementar lógica de remoção via Inertia
        console.log('Removendo item:', itemId);
    };

    const applyCoupon = () => {
        // Implementar lógica de cupom via Inertia
        console.log('Aplicando cupom:', couponCode);
    };

    if (cartItems.length === 0) {
        return (
            <ShopLayout title="Carrinho - Loja Personalizável">
                <div className="container px-4 py-8 sm:px-6 lg:px-8">
                    <div className="text-center py-12">
                        <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                        <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Seu carrinho está vazio
                        </h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Adicione alguns produtos ao seu carrinho para continuar
                        </p>
                        <Link href="/products" className="mt-6 inline-block">
                            <Button size="lg">
                                Continuar Comprando
                            </Button>
                        </Link>
                    </div>
                </div>
            </ShopLayout>
        );
    }

    return (
        <ShopLayout title="Carrinho - Loja Personalizável">
            <div className="container px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-8">
                    Seu Carrinho
                </h1>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Itens do Carrinho ({cartItems.length})</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-4">
                                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                            <img
                                                src={item.product.images[0] || '/images/placeholder-product.jpg'}
                                                alt={item.product.name}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold">
                                                <Link 
                                                    href={`/products/${item.product.slug}`}
                                                    className="hover:text-blue-600"
                                                >
                                                    {item.product.name}
                                                </Link>
                                            </h3>
                                            {item.variant && (
                                                <p className="text-sm text-gray-500">
                                                    {item.variant.name}: {item.variant.value}
                                                </p>
                                            )}
                                            <p className="text-sm font-medium">
                                                {formatPrice(item.unit_price)}
                                            </p>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-semibold">
                                                {formatPrice(item.total_price)}
                                            </p>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Resumo do Pedido</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Coupon */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Cupom de Desconto
                                    </label>
                                    <div className="flex space-x-2">
                                        <Input
                                            type="text"
                                            placeholder="Digite seu cupom"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                        />
                                        <Button variant="outline" onClick={applyCoupon}>
                                            Aplicar
                                        </Button>
                                    </div>
                                </div>

                                <Separator />

                                {/* Price Breakdown */}
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(cartTotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Frete</span>
                                        <span>{shipping === 0 ? 'Grátis' : formatPrice(shipping)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Impostos</span>
                                        <span>{formatPrice(tax)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total</span>
                                        <span>{formatPrice(finalTotal)}</span>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <Link href="/checkout">
                                        <Button className="w-full" size="lg">
                                            Finalizar Compra
                                        </Button>
                                    </Link>
                                    <Link href="/products">
                                        <Button variant="outline" className="w-full">
                                            Continuar Comprando
                                        </Button>
                                    </Link>
                                </div>

                                {/* Shipping Info */}
                                <div className="text-sm text-gray-600 dark:text-gray-400 pt-4">
                                    <p>🚚 Frete grátis para compras acima de R$ 99</p>
                                    <p>🔒 Compra 100% segura e protegida</p>
                                    <p>↩️ Troca gratuita em até 30 dias</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
