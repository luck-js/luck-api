FROM node:10.15.3

WORKDIR /usr/src/luck-api

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

EXPOSE 9000

ENTRYPOINT ["npm", "run", "watch"]
