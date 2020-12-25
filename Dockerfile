FROM node:15.4 AS FrontEndBuild

COPY frontend/package.json .
RUN yarn install
COPY frontend/. .
RUN yarn build

FROM debian:bullseye-slim
LABEL maintainer="Patrick Jean Meurer <potreco@live.com>" \
  description="Container simples para hospedar o teste da Lyncas"

RUN apt update -y && apt install --no-install-recommends -y nginx php-cli php-fpm \
  php-xml php-simplexml php-mbstring php-dom php-gd php-zip php-pgsql zip \
  unzip curl supervisor curl wait-for-it ca-certificates

COPY config/php.ini /etc/php/7.4/fpm/conf.d/custom.ini
COPY config/php.ini /etc/php/7.4/cli/conf.d/custom.ini
COPY config/fpm-pool.conf /etc/php/7.4/fpm/pool.d/www.conf
RUN service php7.4-fpm start

COPY --from=composer /usr/bin/composer /usr/bin/composer

COPY config/webserver.conf /etc/nginx/sites-available/default

COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

### BackEnd ###
WORKDIR /var/www/backend

COPY --chown=www-data:www-data backend/composer.json ./
RUN composer install --no-scripts --no-dev --no-autoloader

COPY --chown=www-data:www-data backend/. .
COPY --chown=www-data:www-data backend/.env.example .env

RUN composer dump-autoload && php artisan key:generate --force

### FrontEnd ###
WORKDIR /var/www/frontend
COPY --from=FrontEndBuild build/. .

# Define um Entrypoint
WORKDIR /
COPY config/onStartup.sh .
RUN chmod +x onStartup.sh
# ENTRYPOINT ["wait-for-it", "Lyncas-Books-DB:5432", "-- ./onStartup.sh"]

# Let supervisord start nginx
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

# Configure a healthcheck to validate that everything is up&running
HEALTHCHECK --timeout=5s --start-period=30s CMD curl --silent --fail http://127.0.0.1/ping
