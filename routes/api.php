
<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Public routes
Route::prefix('v1')->group(function () {
    // Categories
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{category:slug}', [CategoryController::class, 'show']);
    
    // Products
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{product:slug}', [ProductController::class, 'show']);
    Route::get('/products/category/{category:slug}', [ProductController::class, 'byCategory']);
    Route::get('/products/featured', [ProductController::class, 'featured']);
    Route::get('/products/search', [ProductController::class, 'search']);
    
    // Cart (guest and authenticated)
    Route::get('/cart', [CartController::class, 'show']);
    Route::post('/cart/add', [CartController::class, 'add']);
    Route::put('/cart/update/{cartItem}', [CartController::class, 'update']);
    Route::delete('/cart/remove/{cartItem}', [CartController::class, 'remove']);
    Route::delete('/cart/clear', [CartController::class, 'clear']);
    Route::post('/cart/apply-coupon', [CartController::class, 'applyCoupon']);
    Route::delete('/cart/remove-coupon', [CartController::class, 'removeCoupon']);
});

// Authenticated routes
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);
    Route::put('/orders/{order}/cancel', [OrderController::class, 'cancel']);
});

// Admin routes
Route::middleware(['auth:sanctum', 'admin'])->prefix('v1/admin')->group(function () {
    // Categories management
    Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);
    
    // Products management
    Route::apiResource('products', ProductController::class)->except(['index', 'show']);
    Route::put('/products/{product}/toggle-featured', [ProductController::class, 'toggleFeatured']);
    
    // Orders management
    Route::get('/orders', [OrderController::class, 'adminIndex']);
    Route::put('/orders/{order}/status', [OrderController::class, 'updateStatus']);
    
    // Dashboard stats
    Route::get('/dashboard/stats', function () {
        return response()->json([
            'total_orders' => \App\Models\Order::count(),
            'total_products' => \App\Models\Product::count(),
            'total_customers' => \App\Models\User::where('role', 'customer')->count(),
            'total_revenue' => \App\Models\Order::where('status', '!=', 'cancelled')->sum('total_amount'),
            'recent_orders' => \App\Models\Order::with('user')->latest()->take(5)->get(),
            'top_products' => \App\Models\Product::withCount('orderItems')->orderBy('order_items_count', 'desc')->take(5)->get()
        ]);
    });
});
