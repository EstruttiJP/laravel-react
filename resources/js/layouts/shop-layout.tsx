
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ShoppingCart, Search, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface ShopLayoutProps {
    children: React.ReactNode;
    title?: string;
    cartItemsCount?: number;
}

export default function ShopLayout({ children, title = 'Loja', cartItemsCount = 0 }: ShopLayoutProps) {
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
                                </nav>
                            </SheetContent>
                        </Sheet>

                        {/* Logo */}
                        <div className="mr-4 hidden md:flex">
                            <Link href="/" className="mr-6 flex items-center space-x-2">
                                <span className="hidden font-bold sm:inline-block">
                                    E-Commerce
                                </span>
                            </Link>
                        </div>

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

                            {/* Cart and User */}
                            <div className="flex items-center space-x-2">
                                <Link href="/cart">
                                    <Button variant="ghost" size="icon" className="relative">
                                        <ShoppingCart className="h-5 w-5" />
                                        {cartItemsCount > 0 && (
                                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                                                {cartItemsCount}
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

                {/* Main content */}
                <main className="flex-1">
                    {children}
                </main>

                {/* Footer */}
                <footer className="border-t">
                    <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                                © 2024 E-Commerce. Todos os direitos reservados.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
