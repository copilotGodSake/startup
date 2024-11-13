FROM node:14-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

COPY package*.json ./

RUN npm install

# Копируем остальные файлы проекта в рабочую директорию
COPY . .

RUN npm run build

# Стадия для продакшн
FROM nginx:stable-alpine

# Cтадии сборки в директорию Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурационный файл Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Порт
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]