FROM php:8.0.2-cli
WORKDIR /Laravel
COPY . .
RUN docker-php-ext-install mysqli pdo pdo_mysql
EXPOSE 8000