<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;

Route::get('/', function () {
    $featuredProducts = Product::where('featured', true)->take(8)->get();
    $categories = Category::all();
    return Inertia::render('shop/home', [
        'featuredProducts' => $featuredProducts,
        'categories' => $categories,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/products', function () {
    $products = Product::with('categories')->paginate(20);
    $categories = Category::all();
    $filters = [];
    return Inertia::render('shop/products', [
        'products' => $products,
        'categories' => $categories,
        'filters' => $filters,
    ]);
})->name('products.index');

Route::get('/products/{slug}', function ($slug) {
    $product = Product::with('categories', 'variants')->where('slug', $slug)->firstOrFail();
    $relatedProducts = Product::where('id', '!=', $product->id)->take(4)->get();
    return Inertia::render('shop/product-detail', [
        'product' => $product,
        'relatedProducts' => $relatedProducts,
    ]);
})->name('products.show');

Route::get('/categories', function () {
    $categories = Category::all();
    return Inertia::render('shop/categories', [
        'categories' => $categories,
    ]);
})->name('categories.index');

Route::get('/cart', [\App\Http\Controllers\CartController::class, 'index'])->name('cart.index');

Route::middleware(['auth'])->group(function () {
    Route::post('/cart/add', [\App\Http\Controllers\CartController::class, 'add'])->name('cart.add');
    Route::put('/cart/update/{cartItem}', [\App\Http\Controllers\CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/remove/{cartItem}', [\App\Http\Controllers\CartController::class, 'remove'])->name('cart.remove');
    Route::post('/cart/apply-coupon', [\App\Http\Controllers\CartController::class, 'applyCoupon'])->name('cart.applyCoupon');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
