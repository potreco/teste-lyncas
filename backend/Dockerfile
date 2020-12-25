FROM debian:bullseye-slim
LABEL maintainer="Patrick Jean Meurer <potreco@live.com>" \
    description="Container simples para hospedar o teste da Lyncas"

# Instala as Dependências
RUN apt update -y && apt install --no-install-recommends -y nginx supervisor php-cli php-fpm php-xml php-simplexml \
    php-mbstring php-dom php-gd php-zip php-pgsql zip unzip curl ca-certificates wait-for-it

# Configura o PHP-FPM
RUN service php7.4-fpm start
COPY .deploy/php.ini /etc/php/7.4/fpm/conf.d/custom.ini
COPY .deploy/php.ini /etc/php/7.4/cli/conf.d/custom.ini
COPY .deploy/fpm-pool.conf /etc/php/7.4/fpm/pool.d/www.conf

# Configura o Supervisor
COPY .deploy/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Configura o Nginx
COPY .deploy/nginx-server.conf /etc/nginx/sites-available/default

# Configura o Composer
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Muda o Workdir
WORKDIR /var/www/html

# Copia e instala as dependências do projeto
COPY --chown=www-data:www-data composer.json composer.lock ./
RUN composer install --no-scripts --no-dev --no-autoloader

# Define env args
ENV APP_ENV=production
ENV DB_PASSWORD=abc123A
ENV APP_DEBUG=false

# Copy project and run project commands
COPY --chown=www-data:www-data . .
COPY --chown=www-data:www-data .env.example .env

# Configurações do projeto
RUN composer dump-autoload && php artisan key:generate --force

COPY .deploy/startup.sh .

# Define um Entrypoint
ENTRYPOINT ["wait-for-it", "Lyncas-Books-DB:5432", "-s", "-q", "--", "./startup.sh"]

# Let supervisord start nginx & php-fpm
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

EXPOSE 80

# Configure a healthcheck to validate that everything is up&running
HEALTHCHECK --timeout=5s --start-period=30s CMD curl --silent --fail http://127.0.0.1/ping

