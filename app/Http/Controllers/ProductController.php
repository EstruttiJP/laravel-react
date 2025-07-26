<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('categories');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('category')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $products = $query->orderBy('created_at', 'desc')->paginate(20);

        return Inertia::render('admin/products/index', [
            'products' => $products,
            'filters' => $request->only(['search', 'category', 'status'])
        ]);
    }

    public function create()
    {
        $categories = Category::active()->get();
        
        return Inertia::render('admin/products/create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'short_description' => 'nullable|string',
            'sku' => 'required|string|unique:products',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0|lt:price',
            'stock_quantity' => 'required|integer|min:0',
            'manage_stock' => 'boolean',
            'weight' => 'nullable|numeric|min:0',
            'dimensions' => 'nullable|array',
            'status' => 'required|in:active,inactive,draft',
            'featured' => 'boolean',
            'categories' => 'array',
            'categories.*' => 'exists:categories,id',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $validated['in_stock'] = $validated['stock_quantity'] > 0;

        $product = Product::create($validated);

        if (isset($validated['categories'])) {
            $product->categories()->sync($validated['categories']);
        }

        return redirect()->route('admin.products.index')
            ->with('success', 'Produto criado com sucesso!');
    }

    public function show(Product $product)
    {
        $product->load('categories', 'variants');
        
        return Inertia::render('admin/products/show', [
            'product' => $product
        ]);
    }

    public function edit(Product $product)
    {
        $product->load('categories');
        $categories = Category::active()->get();
        
        return Inertia::render('admin/products/edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'short_description' => 'nullable|string',
            'sku' => 'required|string|unique:products,sku,' . $product->id,
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0|lt:price',
            'stock_quantity' => 'required|integer|min:0',
            'manage_stock' => 'boolean',
            'weight' => 'nullable|numeric|min:0',
            'dimensions' => 'nullable|array',
            'status' => 'required|in:active,inactive,draft',
            'featured' => 'boolean',
            'categories' => 'array',
            'categories.*' => 'exists:categories,id',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $validated['in_stock'] = $validated['stock_quantity'] > 0;

        $product->update($validated);

        if (isset($validated['categories'])) {
            $product->categories()->sync($validated['categories']);
        }

        return redirect()->route('admin.products.index')
            ->with('success', 'Produto atualizado com sucesso!');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('success', 'Produto removido com sucesso!');
    }

    // Public API Methods
    public function apiIndex(Request $request)
    {
        $query = Product::with('categories')->active()->inStock();

        if ($request->filled('category')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('featured')) {
            $query->featured();
        }

        return $query->orderBy('created_at', 'desc')->paginate(12);
    }

    public function apiShow($slug)
    {
        return Product::with('categories', 'variants')
            ->where('slug', $slug)
            ->active()
            ->firstOrFail();
    }
}
