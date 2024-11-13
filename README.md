# Startup Project

Это проект React, использующий Vite для сборки

## Установка и запуск

Постройте Docker-образ с именем my-react-app:

docker build -t my-react-app .

Запустите Docker-контейнер, пробросив порт 80 из контейнера на ваш локальный порт 80:

docker run -p 80:80 my-react-app

Откройте браузер и перейдите по адресу: http://localhost
