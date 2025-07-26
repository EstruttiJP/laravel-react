
<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Cart;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Auth::user()->orders()
            ->with('items.product')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('orders/index', [
            'orders' => $orders
        ]);
    }

    public function show(Order $order)
    {
        $this->authorize('view', $order);
        
        $order->load('items.product', 'items.variant');

        return Inertia::render('orders/show', [
            'order' => $order
        ]);
    }

    public function checkout()
    {
        $cart = Cart::where('user_id', Auth::id())
            ->orWhere('session_id', session()->getId())
            ->with(['items.product', 'items.variant'])
            ->first();

        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->route('cart.index')
                ->with('error', 'Seu carrinho está vazio!');
        }

        return Inertia::render('checkout/index', [
            'cart' => $cart
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'billing_address' => 'required|array',
            'billing_address.name' => 'required|string',
            'billing_address.email' => 'required|email',
            'billing_address.phone' => 'required|string',
            'billing_address.address' => 'required|string',
            'billing_address.city' => 'required|string',
            'billing_address.state' => 'required|string',
            'billing_address.zip_code' => 'required|string',
            'shipping_address' => 'required|array',
            'payment_method' => 'required|string',
            'coupon_code' => 'nullable|string',
        ]);

        $cart = Cart::where('user_id', Auth::id())
            ->orWhere('session_id', session()->getId())
            ->with(['items.product', 'items.variant'])
            ->first();

        if (!$cart || $cart->items->isEmpty()) {
            return back()->with('error', 'Seu carrinho está vazio!');
        }

        DB::beginTransaction();

        try {
            $subtotal = $cart->total;
            $taxAmount = 0;
            $shippingAmount = 10.00; // Valor fixo para simulação
            $discountAmount = 0;

            // Aplicar cupom se fornecido
            if ($validated['coupon_code']) {
                $coupon = Coupon::where('code', $validated['coupon_code'])->active()->first();
                if ($coupon && $coupon->isValid($subtotal)) {
                    $discountAmount = $coupon->calculateDiscount($subtotal);
                    $coupon->increment('used_count');
                }
            }

            $totalAmount = $subtotal + $taxAmount + $shippingAmount - $discountAmount;

            $order = Order::create([
                'user_id' => Auth::id(),
                'subtotal' => $subtotal,
                'tax_amount' => $taxAmount,
                'shipping_amount' => $shippingAmount,
                'discount_amount' => $discountAmount,
                'total_amount' => $totalAmount,
                'billing_address' => $validated['billing_address'],
                'shipping_address' => $validated['shipping_address'],
                'payment_method' => $validated['payment_method'],
                'payment_status' => 'pending',
            ]);

            // Criar itens do pedido
            foreach ($cart->items as $item) {
                $order->items()->create([
                    'product_id' => $item->product_id,
                    'product_variant_id' => $item->product_variant_id,
                    'product_name' => $item->product->name,
                    'product_sku' => $item->variant ? $item->variant->sku : $item->product->sku,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'total' => $item->total,
                ]);

                // Atualizar estoque
                if ($item->variant) {
                    $item->variant->decrement('stock_quantity', $item->quantity);
                } else {
                    $item->product->decrement('stock_quantity', $item->quantity);
                }
            }

            // Limpar carrinho
            $cart->items()->delete();

            DB::commit();

            return redirect()->route('orders.show', $order)
                ->with('success', 'Pedido realizado com sucesso!');

        } catch (\Exception $e) {
            DB::rollback();
            return back()->with('error', 'Erro ao processar pedido: ' . $e->getMessage());
        }
    }

    // Admin Methods
    public function adminIndex()
    {
        $orders = Order::with('user', 'items')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('admin/orders/index', [
            'orders' => $orders
        ]);
    }

    public function adminShow(Order $order)
    {
        $order->load('user', 'items.product', 'items.variant');

        return Inertia::render('admin/orders/show', [
            'order' => $order
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled'
        ]);

        $order->update($validated);

        return back()->with('success', 'Status do pedido atualizado!');
    }
}
