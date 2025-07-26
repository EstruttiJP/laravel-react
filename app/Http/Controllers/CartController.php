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

        $cartItems = $cart->items->map(function ($item) {
            return [
                'id' => $item->id,
                'product' => $item->product,
                'variant' => $item->variant,
                'quantity' => $item->quantity,
                'price' => $item->price,
                'subtotal' => $item->quantity * $item->price,
            ];
        });
        $cartTotal = $cartItems->sum('subtotal');
        $shipping = 0; // Calcule conforme sua lógica
        $tax = 0; // Calcule conforme sua lógica
        $finalTotal = $cartTotal + $shipping + $tax;

        return Inertia::render('shop/cart', [
            'cartItems' => $cartItems,
            'cartTotal' => $cartTotal,
            'shipping' => $shipping,
            'tax' => $tax,
            'finalTotal' => $finalTotal,
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

        return redirect()->route('cart.index')->with('success', 'Produto adicionado ao carrinho!');
    }

    public function update(Request $request, CartItem $cartItem)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem->update($validated);

        return redirect()->route('cart.index')->with('success', 'Carrinho atualizado!');
    }

    public function remove(CartItem $cartItem)
    {
        $cartItem->delete();

        return redirect()->route('cart.index')->with('success', 'Item removido do carrinho!');
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

    public function applyCoupon(Request $request)
    {
        // Lógica de cupom (exemplo)
        $request->validate([
            'coupon' => 'required|string',
        ]);
        // Aqui você pode validar o cupom e aplicar desconto no carrinho
        return redirect()->route('cart.index')->with('success', 'Cupom aplicado!');
    }
}
