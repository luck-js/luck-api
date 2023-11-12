<p align="center">
  <a href="https://luck.org.pl">
    <img src="https://i.ibb.co/QHvvB0J/api-1.png" width="318px" alt="Luck logo" />
  </a>
</p>
<h3 align="center">See the applications that will help you organize draws.</h3>
<p align="center">This is the architecture of <b>Luck API</b> server. It's written in <b>TypeScript</b> and runs on <b>NodeJS</b> server.</p>
<br />
<p align="center">

  <a href="https://github.com/luck-js/luck-api/contributors">
    <img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen">
  </a>

  <a href="https://github.com/luck-js/luck-api/contributors">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/luck-js/luck-api">
  </a>

  <a href="https://luck.org.pl">
    <img alt="Luck Website" src="https://img.shields.io/website/https/luck.org.pl">
  </a>

  <a href="https://github.com/luck-js/luck-api/releases">
    <img alt="GitHub release" src="https://img.shields.io/github/release/luck-js/luck-api">
  </a>
  
</p>

<br>

<p align="center">
  <a href="https://luck.org.pl">
    <img src="https://i.ibb.co/ZS4hZBx/Screenshot-2019-08-12-at-19-37-55.png" />
  </a>
</p>

<br>

<p align="center">See also the front-end repository  <b><a href="https://github.com/luck-js/luck-ui">Luck UI</a></b></p>

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

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4d0551b7c8fd4cb09133f9e518707030)](https://www.codacy.com/app/dkarski/luck-api?utm_source=github.com&utm_medium=referral&utm_content=luck-js/luck-api&utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/luck-js/luck-api.svg?branch=master)](https://travis-ci.org/luck-js/luck-api)
[![GitHub issues](https://img.shields.io/github/issues/luck-js/luck-api)](https://github.com/luck-js/luck-api/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
