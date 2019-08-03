# Luck-api

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![GitHub contributors](https://img.shields.io/github/contributors/luck-js/luck-api)

#### For more information about this project, see the front-end [Luck app repository](https://github.com/luck-js/luck-ui)

## About **luck-api**

This repository contains a CRUD back-end, written in TypeScript, for **Luck** application. You can interact with this server, using [luck-ui web app](https://github.com/luck-js/luck-ui), or with curl or postman.

## Setup

This application uses mongo

1. Clone this repository using `git clone`
2. Install dependencies using `npm install`
3. Setup mongo database (either local or hosted)
4. Create `.env` file based on `.env.example`. For local mongodb, you can just copy over example contents to actual `.env`, and everything should work.
5. If using local mongo, remember to start the db with `mongod` in a separate process
6. Run `npm run watch`, and start developing!

## Production Build

To create production build, simply run `npm run build`. It will compile the project to javascript, and start the production server.

## Endpoints Documentation

Currently there is no documentation available, but in the future we plan to add one (e.g. swagger).

## Authors and License

**Luck** was created by [Daniel Karski](https://github.com/dkarski). Desig nand mocks of the application are by [Mateusz Karski](https://www.behance.net/user/?username=MateuszKarski).
