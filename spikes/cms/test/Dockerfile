# Local stand-in for GoDaddy-style shared hosting: Apache + mod_php, mod_rewrite, .htaccess honoured.
# Only used for smoke tests; nothing from this image ships.
FROM php:8.3-apache
RUN apt-get update \
 && apt-get install -y --no-install-recommends libpng-dev libjpeg62-turbo-dev libfreetype6-dev libwebp-dev libzip-dev unzip \
 && docker-php-ext-configure gd --with-jpeg --with-freetype --with-webp \
 && docker-php-ext-install -j"$(nproc)" gd zip opcache \
 && a2enmod rewrite headers \
 && rm -rf /var/lib/apt/lists/*
