FROM node:18.18.2

WORKDIR /usr/src/luck-api

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

# Wykonaj komendę budowania
RUN npm run build

EXPOSE 9000

# Ustaw punkt wejścia dla kontenera
CMD ["npm", "start"]
