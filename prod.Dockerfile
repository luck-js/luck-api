FROM node:9.11.2

MAINTAINER Karski Daniel

COPY . /var/ts-luck-api

WORKDIR /var/ts-luck-api

RUN npm install

EXPOSE $TS_PORT_EXPOSE

ENTRYPOINT ["npm", "run", "watch"]
