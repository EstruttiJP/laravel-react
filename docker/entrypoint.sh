#!/bin/sh
set -e

# Se não existir .env, cria baseado no exemplo
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Instala dependências PHP se a pasta vendor não existir
if [ ! -f vendor/autoload.php ]; then
    echo ">> Instalando dependências PHP..."
    composer install --no-dev --optimize-autoloader || { echo ">> ERRO: Composer install falhou!"; exit 1; }
fi

# Agora sim podemos rodar artisan
if ! grep -q "APP_KEY=" .env || [ -z "$(grep 'APP_KEY=' .env | cut -d '=' -f2)" ]; then
    echo ">> Gerando APP_KEY..."
    php artisan key:generate --force
fi

# Instala dependências Node se não existir node_modules
if [ ! -d node_modules ]; then
    echo ">> Instalando dependências Node..."
    npm install
    npm run build
fi

echo ">> Ajustando permissões..."
chown -R www-data:www-data storage bootstrap/cache

echo ">> Executando migrações..."
php artisan migrate --force || echo ">> Aviso: migrações não puderam ser aplicadas agora."

echo ">> Limpando e criando cache Laravel..."
php artisan optimize:clear
php artisan config:cache

exec "$@"
