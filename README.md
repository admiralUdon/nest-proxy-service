<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://static-00.iconduck.com/assets.00/key-icon-512x510-f5hzglej.png" width="100" alt="Nest Logo" /></a>
</p>

<p align="center">A <a href="http://nestjs.com/" target="_blank">NestJS</a>-based application that securely proxies requests to backend services, featuring session-based authentication via Passport.js.</p>

<p align="center">


## Description

The Secure Proxy Gateway is a NestJS-based application designed to act as a secure intermediary between clients and backend services. It enhances security by implementing multiple authentication mechanisms, including basic user-password authentication and Single Sign-On (SSO) with popular identity providers like Azure, Google, Apple, and Discord.

## Configuration
```bash
$ cp .env.example .env
```
Open .env in your prefered text editor
```bash
# Proxy URL (change this to your proxied url, refer .env.example)
PROXY_URL=http://example.com
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Ahmad Miqdaad](https://www.admiraludon.com)
- Website - [https://www.admiraludon.com](https://www.admiraludon.com/)

## License

Nest is [MIT licensed](LICENSE).
