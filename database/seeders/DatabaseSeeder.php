
<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Coupon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 'admin',
            'phone' => '+55 11 99999-9999',
            'address' => [
                'street' => 'Rua das Flores, 123',
                'city' => 'São Paulo',
                'state' => 'SP',
                'zip_code' => '01234-567',
                'country' => 'Brasil'
            ]
        ]);

        // Create regular users
        $users = User::factory(10)->create([
            'role' => 'customer'
        ]);

        // Create categories
        $categories = [
            [
                'name' => 'Eletrônicos',
                'slug' => 'eletronicos',
                'description' => 'Produtos eletrônicos e tecnologia',
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'name' => 'Roupas',
                'slug' => 'roupas',
                'description' => 'Vestuário e acessórios',
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'name' => 'Casa e Jardim',
                'slug' => 'casa-jardim',
                'description' => 'Itens para casa e jardim',
                'is_active' => true,
                'sort_order' => 3
            ],
            [
                'name' => 'Esportes',
                'slug' => 'esportes',
                'description' => 'Artigos esportivos',
                'is_active' => true,
                'sort_order' => 4
            ]
        ];

        $createdCategories = [];
        foreach ($categories as $categoryData) {
            $createdCategories[] = Category::create($categoryData);
        }

        // Create subcategories
        $subcategories = [
            [
                'name' => 'Smartphones',
                'slug' => 'smartphones',
                'description' => 'Celulares e smartphones',
                'parent_id' => $createdCategories[0]->id,
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'name' => 'Laptops',
                'slug' => 'laptops',
                'description' => 'Notebooks e laptops',
                'parent_id' => $createdCategories[0]->id,
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'name' => 'Camisetas',
                'slug' => 'camisetas',
                'description' => 'Camisetas masculinas e femininas',
                'parent_id' => $createdCategories[1]->id,
                'is_active' => true,
                'sort_order' => 1
            ]
        ];

        foreach ($subcategories as $subcategoryData) {
            $createdCategories[] = Category::create($subcategoryData);
        }

        // Create products
        $products = [
            [
                'name' => 'iPhone 15 Pro',
                'slug' => 'iphone-15-pro',
                'description' => 'O mais avançado iPhone com chip A17 Pro e câmera profissional.',
                'short_description' => 'iPhone 15 Pro com 128GB',
                'sku' => 'IP15P-128',
                'price' => 7999.00,
                'sale_price' => 7499.00,
                'stock_quantity' => 50,
                'weight' => 0.187,
                'dimensions' => ['length' => 14.67, 'width' => 7.06, 'height' => 0.83],
                'status' => 'active',
                'featured' => true,
                'images' => [
                    '/images/products/iphone-15-pro-1.jpg',
                    '/images/products/iphone-15-pro-2.jpg'
                ],
                'categories' => [$createdCategories[4]->id] // Smartphones
            ],
            [
                'name' => 'MacBook Pro 14"',
                'slug' => 'macbook-pro-14',
                'description' => 'MacBook Pro com chip M3 Pro, tela Liquid Retina XDR de 14 polegadas.',
                'short_description' => 'MacBook Pro 14" M3 Pro',
                'sku' => 'MBP14-M3P',
                'price' => 15999.00,
                'stock_quantity' => 25,
                'weight' => 1.6,
                'dimensions' => ['length' => 31.26, 'width' => 22.12, 'height' => 1.55],
                'status' => 'active',
                'featured' => true,
                'images' => [
                    '/images/products/macbook-pro-14-1.jpg',
                    '/images/products/macbook-pro-14-2.jpg'
                ],
                'categories' => [$createdCategories[5]->id] // Laptops
            ],
            [
                'name' => 'Camiseta Básica Premium',
                'slug' => 'camiseta-basica-premium',
                'description' => 'Camiseta básica de algodão 100% orgânico, super macia e confortável.',
                'short_description' => 'Camiseta básica de algodão orgânico',
                'sku' => 'CB-PREM',
                'price' => 89.90,
                'sale_price' => 69.90,
                'stock_quantity' => 200,
                'weight' => 0.15,
                'dimensions' => ['length' => 30, 'width' => 25, 'height' => 0.5],
                'status' => 'active',
                'featured' => false,
                'images' => [
                    '/images/products/camiseta-basica-1.jpg',
                    '/images/products/camiseta-basica-2.jpg'
                ],
                'categories' => [$createdCategories[6]->id] // Camisetas
            ],
            [
                'name' => 'Tênis Running Pro',
                'slug' => 'tenis-running-pro',
                'description' => 'Tênis profissional para corrida com tecnologia de amortecimento avançada.',
                'short_description' => 'Tênis para corrida profissional',
                'sku' => 'TRP-001',
                'price' => 299.90,
                'stock_quantity' => 100,
                'weight' => 0.35,
                'dimensions' => ['length' => 30, 'width' => 12, 'height' => 10],
                'status' => 'active',
                'featured' => true,
                'images' => [
                    '/images/products/tenis-running-1.jpg',
                    '/images/products/tenis-running-2.jpg'
                ],
                'categories' => [$createdCategories[3]->id] // Esportes
            ]
        ];

        $createdProducts = [];
        foreach ($products as $productData) {
            $categories = $productData['categories'];
            unset($productData['categories']);
            
            $product = Product::create($productData);
            $product->categories()->attach($categories);
            $createdProducts[] = $product;
        }

        // Create product variants
        $variants = [
            // iPhone variants (colors)
            [
                'product_id' => $createdProducts[0]->id,
                'name' => 'Cor',
                'value' => 'Titânio Natural',
                'sku' => 'IP15P-128-TN',
                'stock_quantity' => 20
            ],
            [
                'product_id' => $createdProducts[0]->id,
                'name' => 'Cor',
                'value' => 'Titânio Azul',
                'sku' => 'IP15P-128-TA',
                'stock_quantity' => 15
            ],
            [
                'product_id' => $createdProducts[0]->id,
                'name' => 'Cor',
                'value' => 'Titânio Branco',
                'sku' => 'IP15P-128-TB',
                'stock_quantity' => 15
            ],
            // Camiseta variants (sizes and colors)
            [
                'product_id' => $createdProducts[2]->id,
                'name' => 'Tamanho',
                'value' => 'P',
                'sku' => 'CB-PREM-P-BR',
                'stock_quantity' => 50
            ],
            [
                'product_id' => $createdProducts[2]->id,
                'name' => 'Tamanho',
                'value' => 'M',
                'sku' => 'CB-PREM-M-BR',
                'stock_quantity' => 50
            ],
            [
                'product_id' => $createdProducts[2]->id,
                'name' => 'Tamanho',
                'value' => 'G',
                'sku' => 'CB-PREM-G-BR',
                'stock_quantity' => 50
            ],
            [
                'product_id' => $createdProducts[2]->id,
                'name' => 'Tamanho',
                'value' => 'GG',
                'sku' => 'CB-PREM-GG-BR',
                'stock_quantity' => 50
            ],
            // Tênis variants (sizes)
            [
                'product_id' => $createdProducts[3]->id,
                'name' => 'Tamanho',
                'value' => '38',
                'sku' => 'TRP-001-38',
                'stock_quantity' => 10
            ],
            [
                'product_id' => $createdProducts[3]->id,
                'name' => 'Tamanho',
                'value' => '39',
                'sku' => 'TRP-001-39',
                'stock_quantity' => 15
            ],
            [
                'product_id' => $createdProducts[3]->id,
                'name' => 'Tamanho',
                'value' => '40',
                'sku' => 'TRP-001-40',
                'stock_quantity' => 20
            ],
            [
                'product_id' => $createdProducts[3]->id,
                'name' => 'Tamanho',
                'value' => '41',
                'sku' => 'TRP-001-41',
                'stock_quantity' => 20
            ],
            [
                'product_id' => $createdProducts[3]->id,
                'name' => 'Tamanho',
                'value' => '42',
                'sku' => 'TRP-001-42',
                'stock_quantity' => 15
            ],
            [
                'product_id' => $createdProducts[3]->id,
                'name' => 'Tamanho',
                'value' => '43',
                'sku' => 'TRP-001-43',
                'stock_quantity' => 10
            ]
        ];

        foreach ($variants as $variantData) {
            ProductVariant::create($variantData);
        }

        // Create coupons
        $coupons = [
            [
                'code' => 'WELCOME10',
                'name' => 'Desconto de Boas-vindas',
                'description' => '10% de desconto para novos clientes',
                'type' => 'percentage',
                'value' => 10.00,
                'minimum_amount' => 100.00,
                'usage_limit' => 100,
                'is_active' => true,
                'starts_at' => now(),
                'expires_at' => now()->addMonths(3)
            ],
            [
                'code' => 'FRETE50',
                'name' => 'Frete Grátis',
                'description' => 'R$ 50 de desconto no frete',
                'type' => 'fixed',
                'value' => 50.00,
                'minimum_amount' => 200.00,
                'usage_limit' => 50,
                'is_active' => true,
                'starts_at' => now(),
                'expires_at' => now()->addMonth()
            ],
            [
                'code' => 'BLACKFRIDAY',
                'name' => 'Black Friday',
                'description' => '25% de desconto - Black Friday',
                'type' => 'percentage',
                'value' => 25.00,
                'minimum_amount' => 500.00,
                'usage_limit' => 200,
                'is_active' => false,
                'starts_at' => now()->addMonths(2),
                'expires_at' => now()->addMonths(2)->addDays(7)
            ]
        ];

        foreach ($coupons as $couponData) {
            Coupon::create($couponData);
        }
    }
}
