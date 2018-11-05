FROM node:9.11.2

MAINTAINER Karski Daniel

ENV DATABASE_URL="mongodb://mongo/luck"
ENV PORT=80
ENV HOST=""
ENV CLIENT_URL="www.testdevelop.luck.org.pl"

COPY . /var/www

WORKDIR /var/www

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["npm", "run", "watch"]
