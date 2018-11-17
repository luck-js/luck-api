FROM node:9.11.2

MAINTAINER Karski Daniel

COPY . /var/www

WORKDIR /var/www

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["npm", "run", "watch"]
