<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('parent', 'children')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/categories/index', [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        $categories = Category::active()->get();
        
        return Inertia::render('admin/categories/create', [
            'parentCategories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'parent_id' => 'nullable|exists:categories,id',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        Category::create($validated);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Categoria criada com sucesso!');
    }

    public function show(Category $category)
    {
        $category->load('parent', 'children', 'products');
        
        return Inertia::render('admin/categories/show', [
            'category' => $category
        ]);
    }

    public function edit(Category $category)
    {
        $categories = Category::where('id', '!=', $category->id)->active()->get();
        
        return Inertia::render('admin/categories/edit', [
            'category' => $category,
            'parentCategories' => $categories
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'parent_id' => 'nullable|exists:categories,id',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $category->update($validated);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Categoria atualizada com sucesso!');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->route('admin.categories.index')
            ->with('success', 'Categoria removida com sucesso!');
    }

    // API Methods
    public function apiIndex()
    {
        return Category::with('children')
            ->active()
            ->root()
            ->orderBy('sort_order')
            ->get();
    }
}
