#!/bin/bash

set -e

composer dump-autoload
php artisan migrate --force
php artisan config:cache

exec "$@"
