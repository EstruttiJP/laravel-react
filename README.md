
# 🛒 E-Commerce Personalizável - Laravel + React

Uma plataforma de e-commerce moderna, totalmente customizável, construída com Laravel 11 e React 19, utilizando Inertia.js para uma experiência de SPA sem complicações.

## ✨ Características Principais

### 🎨 Frontend Moderno
- **React 19** com TypeScript para type safety
- **Tailwind CSS 4** para estilização responsiva
- **Radix UI** para componentes acessíveis
- **Lucide React** para ícones consistentes
- **Design System** completamente customizável

### 🚀 Backend Robusto
- **Laravel 11** com arquitetura moderna
- **API RESTful** bem documentada
- **Eloquent ORM** para relacionamentos complexos
- **Middleware** personalizado para autorização
- **Seeders** com dados de exemplo

### 🛍️ Funcionalidades de E-commerce

#### Gestão de Produtos
- ✅ CRUD completo de produtos
- ✅ Variações de produto (tamanho, cor, etc.)
- ✅ Controle de estoque automático
- ✅ Upload de múltiplas imagens
- ✅ SEO otimizado (slugs, meta tags)
- ✅ Categorização hierárquica

#### Carrinho de Compras
- ✅ Carrinho persistente (guest + autenticado)
- ✅ Cálculo automático de preços
- ✅ Aplicação de cupons de desconto
- ✅ Gestão de quantidades
- ✅ Validação de estoque em tempo real

#### Sistema de Pedidos
- ✅ Checkout simplificado
- ✅ Múltiplos status de pedido
- ✅ Histórico completo
- ✅ Cálculo de frete (estrutura preparada)
- ✅ Integração com gateways (estrutura preparada)

#### Painel Administrativo
- ✅ Dashboard com métricas
- ✅ Gestão de usuários e permissões
- ✅ Relatórios de vendas
- ✅ Controle de estoque
- ✅ Sistema de cupons

## 🏗️ Arquitetura

### Estrutura do Projeto
```
├── app/
│   ├── Http/Controllers/          # Controllers da API
│   ├── Models/                    # Modelos Eloquent
│   └── Middleware/               # Middleware personalizado
├── database/
│   ├── migrations/               # Estrutura do banco
│   └── seeders/                  # Dados de exemplo
├── resources/js/
│   ├── components/ui/            # Componentes reutilizáveis
│   ├── layouts/                  # Layouts da aplicação
│   ├── pages/shop/              # Páginas do e-commerce
│   └── pages/admin/             # Painel administrativo
└── routes/
    ├── api.php                   # Rotas da API
    └── web.php                   # Rotas web
```

### Modelos de Dados

#### Produtos
```php
Product {
  id, name, slug, description, short_description,
  price, sale_price, sku, stock_quantity,
  weight, dimensions, featured, status
}
```

#### Variações
```php
ProductVariant {
  id, product_id, name, value,
  price_modifier, stock_quantity
}
```

#### Carrinho
```php
Cart {
  id, user_id, session_id, created_at, updated_at
}

CartItem {
  id, cart_id, product_id, product_variant_id,
  quantity, unit_price, total_price
}
```

#### Pedidos
```php
Order {
  id, user_id, status, total_amount,
  shipping_address, billing_address,
  payment_method, payment_status
}
```

## 🚀 Instalação e Configuração

### Pré-requisitos
- PHP 8.2+
- Node.js 20+
- Composer
- NPM/Yarn

### Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd ecommerce-laravel-react
```

2. **Instale dependências**
```bash
# Backend
composer install

# Frontend
npm install
```

3. **Configure o ambiente**
```bash
cp .env.example .env
php artisan key:generate
```

4. **Configure o banco de dados**
```bash
# Edite o .env com suas credenciais
php artisan migrate --seed
```

5. **Inicie o desenvolvimento**
```bash
npm run dev
```

## 🎨 Customização

### Design System

O projeto utiliza um design system baseado em **Tailwind CSS** e **Radix UI**, permitindo customização completa da interface.

#### Cores Principais
```css
--primary: 222.2 84% 4.9%;
--secondary: 210 40% 98%;
--accent: 210 40% 96%;
--muted: 210 40% 96%;
```

#### Componentes Customizáveis
- `Button` - Botões com variações
- `Card` - Cards responsivos
- `Input` - Campos de entrada
- `Select` - Seletores dropdown
- `Badge` - Etiquetas e status

### Layouts

#### ShopLayout
Layout principal para páginas da loja, incluindo:
- Header com navegação
- Busca integrada
- Carrinho de compras
- Footer informativo

#### AdminLayout
Layout para painel administrativo com:
- Sidebar com navegação
- Breadcrumbs
- Menu de usuário
- Dashboard responsivo

## 📱 Páginas Implementadas

### Loja (Frontend)
- ✅ **Home** - Página inicial com produtos em destaque
- ✅ **Produtos** - Listagem com filtros e busca
- ✅ **Produto** - Página detalhada do produto
- ✅ **Carrinho** - Gestão do carrinho de compras
- ✅ **Categorias** - Navegação por categorias
- 🔄 **Checkout** - Finalização de compra
- 🔄 **Minha Conta** - Área do cliente

### Admin (Backend)
- 🔄 **Dashboard** - Métricas e relatórios
- 🔄 **Produtos** - Gestão completa
- 🔄 **Pedidos** - Controle de vendas
- 🔄 **Usuários** - Gestão de clientes
- 🔄 **Configurações** - Personalização da loja

## 🔧 APIs Disponíveis

### Produtos
```http
GET    /api/products              # Listar produtos
GET    /api/products/{slug}       # Produto específico
POST   /api/products              # Criar produto
PUT    /api/products/{id}         # Atualizar produto
DELETE /api/products/{id}         # Deletar produto
```

### Carrinho
```http
GET    /api/cart                  # Ver carrinho
POST   /api/cart/add              # Adicionar item
PUT    /api/cart/update/{id}      # Atualizar quantidade
DELETE /api/cart/remove/{id}      # Remover item
```

### Pedidos
```http
GET    /api/orders                # Listar pedidos
POST   /api/orders                # Criar pedido
GET    /api/orders/{id}           # Pedido específico
PUT    /api/orders/{id}/status    # Atualizar status
```

## 🧪 Testes

```bash
# Executar testes
php artisan test

# Com coverage
php artisan test --coverage
```

## 🚀 Deploy

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
php artisan optimize
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Roadmap

### Próximas Funcionalidades
- [ ] Sistema de reviews e avaliações
- [ ] Wishlist de produtos
- [ ] Comparação de produtos
- [ ] Sistema de afiliados
- [ ] Multi-idiomas
- [ ] PWA (Progressive Web App)
- [ ] Chat de suporte
- [ ] Integração com redes sociais

### Integrações Planejadas
- [ ] Stripe Payment Gateway
- [ ] PagSeguro/PagBank
- [ ] Correios (cálculo de frete)
- [ ] WhatsApp Business
- [ ] Google Analytics
- [ ] Facebook Pixel

## 🎯 Casos de Uso

Este e-commerce é ideal para:

### 🏪 Lojas Pequenas e Médias
- Produtos físicos e digitais
- Gestão simples de estoque
- Carrinho intuitivo
- Checkout otimizado

### 🎨 Agências e Freelancers
- Base sólida para customização
- Design system flexível
- Código bem documentado
- Fácil manutenção

### 🚀 Startups
- Escalabilidade garantida
- Arquitetura moderna
- Deploy simplificado
- Performance otimizada

## 📞 Suporte

Para dúvidas, sugestões ou reportar bugs:

- 📧 Email: suporte@loja.com
- 💬 Discord: [Link do servidor]
- 📚 Wiki: [Link da documentação]
- 🐛 Issues: [Link do GitHub]

---

**Desenvolvido com ❤️ usando Laravel + React**

*Uma plataforma de e-commerce moderna, escalável e totalmente personalizável para o mercado brasileiro.*
