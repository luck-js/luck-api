FROM node:9.11.2

MAINTAINER Karski Daniel

COPY . /var/luck-api

WORKDIR /var/luck-api

RUN npm install

EXPOSE $PROD_PORT_EXPOSE

ENTRYPOINT ["npm", "run", "watch"]
