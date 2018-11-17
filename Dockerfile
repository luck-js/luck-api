FROM node:9.11.2

MAINTAINER Karski Daniel

ENV DATABASE_URL="mongodb://mongo/luck"
ENV PORT=80
ENV CLIENT_URL="www.luck.org.pl"

COPY . /var/luck-api

WORKDIR /var/luck-api

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["npm", "run", "watch"]
