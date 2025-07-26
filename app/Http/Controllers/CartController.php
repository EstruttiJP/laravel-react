<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    private function getCart()
    {
        if (Auth::check()) {
            return Cart::firstOrCreate(
                ['user_id' => Auth::id()],
                ['session_id' => session()->getId()]
            );
        }

        return Cart::firstOrCreate(
            ['session_id' => session()->getId()],
            ['user_id' => null]
        );
    }

    public function index()
    {
        $cart = $this->getCart();
        $cart->load(['items.product', 'items.variant']);

        return Inertia::render('cart/index', [
            'cart' => $cart
        ]);
    }

    public function add(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'variant_id' => 'nullable|exists:product_variants,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($validated['product_id']);
        $variant = null;

        if ($validated['variant_id']) {
            $variant = ProductVariant::findOrFail($validated['variant_id']);
        }

        $price = $variant ? $variant->current_price : $product->current_price;
        $cart = $this->getCart();

        $existingItem = $cart->items()
            ->where('product_id', $validated['product_id'])
            ->where('product_variant_id', $validated['variant_id'])
            ->first();

        if ($existingItem) {
            $existingItem->update([
                'quantity' => $existingItem->quantity + $validated['quantity']
            ]);
        } else {
            $cart->items()->create([
                'product_id' => $validated['product_id'],
                'product_variant_id' => $validated['variant_id'],
                'quantity' => $validated['quantity'],
                'price' => $price,
            ]);
        }

        return back()->with('success', 'Produto adicionado ao carrinho!');
    }

    public function update(Request $request, CartItem $cartItem)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem->update($validated);

        return back()->with('success', 'Carrinho atualizado!');
    }

    public function remove(CartItem $cartItem)
    {
        $cartItem->delete();

        return back()->with('success', 'Item removido do carrinho!');
    }

    public function clear()
    {
        $cart = $this->getCart();
        $cart->items()->delete();

        return back()->with('success', 'Carrinho limpo!');
    }

    // API Methods
    public function apiShow()
    {
        $cart = $this->getCart();
        $cart->load(['items.product', 'items.variant']);

        return $cart;
    }

    public function apiAdd(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'variant_id' => 'nullable|exists:product_variants,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($validated['product_id']);
        $variant = null;

        if ($validated['variant_id']) {
            $variant = ProductVariant::findOrFail($validated['variant_id']);
        }

        $price = $variant ? $variant->current_price : $product->current_price;
        $cart = $this->getCart();

        $existingItem = $cart->items()
            ->where('product_id', $validated['product_id'])
            ->where('product_variant_id', $validated['variant_id'])
            ->first();

        if ($existingItem) {
            $existingItem->update([
                'quantity' => $existingItem->quantity + $validated['quantity']
            ]);
        } else {
            $cart->items()->create([
                'product_id' => $validated['product_id'],
                'product_variant_id' => $validated['variant_id'],
                'quantity' => $validated['quantity'],
                'price' => $price,
            ]);
        }

        $cart->load(['items.product', 'items.variant']);

        return response()->json([
            'message' => 'Produto adicionado ao carrinho!',
            'cart' => $cart
        ]);
    }
}
