
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ShoppingCart, Search, User, Menu, Heart, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface ShopLayoutProps {
    children: React.ReactNode;
    title?: string;
    cartItemsCount?: number;
}

export default function ShopLayout({ children, title = 'Loja Personalizável', cartItemsCount = 0 }: ShopLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container flex h-16 items-center">
                        {/* Mobile menu */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                <nav className="flex flex-col gap-4">
                                    <Link href="/" className="text-lg font-semibold">
                                        Início
                                    </Link>
                                    <Link href="/products" className="text-lg font-semibold">
                                        Produtos
                                    </Link>
                                    <Link href="/categories" className="text-lg font-semibold">
                                        Categorias
                                    </Link>
                                    <Link href="/about" className="text-lg font-semibold">
                                        Sobre
                                    </Link>
                                    <Link href="/contact" className="text-lg font-semibold">
                                        Contato
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>

                        {/* Logo */}
                        <div className="mr-4 hidden md:flex">
                            <Link href="/" className="mr-6 flex items-center space-x-2">
                                <Store className="h-6 w-6 text-blue-600" />
                                <span className="hidden font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent sm:inline-block">
                                    Loja Personalizável
                                </span>
                            </Link>
                        </div>

                        {/* Mobile Logo */}
                        <Link href="/" className="md:hidden flex items-center space-x-2 mr-4">
                            <Store className="h-6 w-6 text-blue-600" />
                            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Loja
                            </span>
                        </Link>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                            <Link
                                href="/"
                                className="transition-colors hover:text-foreground/80 text-foreground"
                            >
                                Início
                            </Link>
                            <Link
                                href="/products"
                                className="transition-colors hover:text-foreground/80 text-foreground/60"
                            >
                                Produtos
                            </Link>
                            <Link
                                href="/categories"
                                className="transition-colors hover:text-foreground/80 text-foreground/60"
                            >
                                Categorias
                            </Link>
                            <Link
                                href="/about"
                                className="transition-colors hover:text-foreground/80 text-foreground/60"
                            >
                                Sobre
                            </Link>
                            <Link
                                href="/contact"
                                className="transition-colors hover:text-foreground/80 text-foreground/60"
                            >
                                Contato
                            </Link>
                        </nav>

                        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                            {/* Search */}
                            <div className="w-full flex-1 md:w-auto md:flex-none">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Buscar produtos..."
                                        className="pl-8 md:w-[300px] lg:w-[400px]"
                                    />
                                </div>
                            </div>

                            {/* Icons */}
                            <div className="flex items-center space-x-2">
                                <Link href="/wishlist">
                                    <Button variant="ghost" size="icon">
                                        <Heart className="h-5 w-5" />
                                        <span className="sr-only">Lista de desejos</span>
                                    </Button>
                                </Link>

                                <Link href="/cart">
                                    <Button variant="ghost" size="icon" className="relative">
                                        <ShoppingCart className="h-5 w-5" />
                                        {cartItemsCount > 0 && (
                                            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-xs text-white flex items-center justify-center">
                                                {cartItemsCount > 99 ? '99+' : cartItemsCount}
                                            </span>
                                        )}
                                        <span className="sr-only">Carrinho</span>
                                    </Button>
                                </Link>
                                
                                <Link href="/login">
                                    <Button variant="ghost" size="icon">
                                        <User className="h-5 w-5" />
                                        <span className="sr-only">Conta</span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Announcement Bar */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
                    <div className="container px-4 text-center">
                        <p className="text-sm font-medium">
                            🚚 Frete GRÁTIS para todo o Brasil nas compras acima de R$ 99 | 
                            📞 Suporte 24/7 | 
                            🔒 Compra 100% Segura
                        </p>
                    </div>
                </div>

                {/* Main content */}
                <main className="flex-1">
                    {children}
                </main>

                {/* Footer */}
                <footer className="border-t bg-gray-50 dark:bg-gray-900">
                    <div className="container px-4 py-12">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                            {/* Brand */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Store className="h-6 w-6 text-blue-600" />
                                    <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        Loja Personalizável
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Sua loja online totalmente personalizável. 
                                    Produtos de qualidade, preços justos e atendimento excepcional.
                                </p>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-gray-400 hover:text-blue-600">
                                        <span className="sr-only">Facebook</span>
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-blue-600">
                                        <span className="sr-only">Instagram</span>
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M12.017 0H7.983C3.588 0 0 3.588 0 7.983v4.034C0 16.412 3.588 20 7.983 20h4.034C16.412 20 20 16.412 20 12.017V7.983C20 3.588 16.412 0 12.017 0zM18.68 12.017c0 3.67-2.993 6.663-6.663 6.663H7.983c-3.67 0-6.663-2.993-6.663-6.663V7.983c0-3.67 2.993-6.663 6.663-6.663h4.034c3.67 0 6.663 2.993 6.663 6.663v4.034z" clipRule="evenodd" />
                                            <path d="M10 5.25c-2.622 0-4.75 2.128-4.75 4.75S7.378 14.75 10 14.75s4.75-2.128 4.75-4.75S12.622 5.25 10 5.25zm0 7.875c-1.725 0-3.125-1.4-3.125-3.125S8.275 6.875 10 6.875s3.125 1.4 3.125 3.125S11.725 13.125 10 13.125z" />
                                            <circle cx="14.917" cy="5.083" r="1.25" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-blue-600">
                                        <span className="sr-only">WhatsApp</span>
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.015 1.006C5.144 1.006 1.209 4.941 1.209 9.812c0 1.675.469 3.241 1.275 4.576L1.01 18.994l4.766-1.45c1.272.734 2.766 1.156 4.369 1.156 4.871 0 8.806-3.935 8.806-8.806 0-4.871-3.935-8.888-8.936-8.888zM10.015 17.518c-1.422 0-2.766-.391-3.934-1.047l-.281-.156-2.934.891.916-2.766-.172-.297c-.703-1.172-1.109-2.531-1.109-4.031 0-4.219 3.434-7.653 7.653-7.653s7.653 3.434 7.653 7.653c-.109 4.203-3.543 7.406-7.792 7.406z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    Links Rápidos
                                </h3>
                                <ul className="space-y-2">
                                    <li><Link href="/products" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">Produtos</Link></li>
                                    <li><Link href="/categories" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">Categorias</Link></li>
                                    <li><Link href="/offers" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">Ofertas</Link></li>
                                    <li><Link href="/brands" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">Marcas</Link></li>
                                </ul>
                            </div>

                            {/* Customer Service */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    Atendimento
                                </h3>
                                <ul className="space-y-2">
                                    <li><Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">Contato</Link></li>
                                    <li><Link href="/faq" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">FAQ</Link></li>
                                    <li><Link href="/shipping" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">Envio e Entrega</Link></li>
                                    <li><Link href="/returns" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">Trocas e Devoluções</Link></li>
                                </ul>
                            </div>

                            {/* Newsletter */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    Newsletter
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Receba ofertas exclusivas e novidades
                                </p>
                                <div className="flex space-x-2">
                                    <Input
                                        type="email"
                                        placeholder="Seu e-mail"
                                        className="flex-1"
                                    />
                                    <Button size="sm">
                                        Inscrever
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                © 2024 Loja Personalizável. Todos os direitos reservados.
                            </p>
                            <div className="flex space-x-6 mt-4 md:mt-0">
                                <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">
                                    Política de Privacidade
                                </Link>
                                <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">
                                    Termos de Uso
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
