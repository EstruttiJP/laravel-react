
# Docker Setup para E-Commerce Laravel React

Este projeto inclui configuração Docker completa para desenvolvimento e produção.

## 🐳 Serviços Inclusos

- **app**: Aplicação Laravel + React
- **db**: MySQL 8.0
- **redis**: Redis para cache e sessões
- **nginx**: Proxy reverso (opcional)

## 🚀 Iniciando com Docker

### Pré-requisitos
- Docker
- Docker Compose

### Instalação

1. **Clone e configure**
```bash
cp .env.docker .env
```

2. **Build e inicie os containers**
```bash
docker-compose up -d --build
```

3. **Execute as migrações**
```bash
docker-compose exec app php artisan migrate --seed
```

4. **Gere a chave da aplicação**
```bash
docker-compose exec app php artisan key:generate
```

### Comandos Úteis

```bash
# Ver logs
docker-compose logs -f

# Executar comandos Laravel
docker-compose exec app php artisan [comando]

# Executar comandos NPM
docker-compose exec app npm [comando]

# Acessar container
docker-compose exec app bash

# Parar containers
docker-compose down

# Rebuild completo
docker-compose down
docker-compose up -d --build
```

## 🌐 Acessos

- **Aplicação**: http://localhost:8000
- **MySQL**: localhost:3306
- **Redis**: localhost:6379

## 📝 Configurações

### Volumes
- `./:/var/www/html` - Código da aplicação
- `dbdata` - Dados do MySQL

### Redes
- `ecommerce` - Rede bridge para comunicação entre containers

## 🔧 Customização

Edite os arquivos em `docker/` para personalizar as configurações:
- `docker/apache.conf` - Configuração Apache
- `docker/nginx/default.conf` - Configuração Nginx
- `docker/php/local.ini` - Configurações PHP
- `docker/mysql/my.cnf` - Configurações MySQL
