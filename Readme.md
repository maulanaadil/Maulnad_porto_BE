[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

[Express'](https://www.npmjs.com/package/express) application generator.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Linux Build][github-actions-ci-image]][github-actions-ci-url]
[![Windows Build][appveyor-image]][appveyor-url]

## Installation

```sh
$ git clone git@github.com:maulanaadil started-template-express.git
```

Configure the database on `.env.example`

install packages

```sh
$ npm install
```

build the project first, for the development / production

```sh
$ npm run build
```

migrate database development

```sh
$ npx prisma migrate dev --name init
```

seeding the data to database

```sh
$ npm run seed
```

start development

```sh
$ npm run dev
```

## Documentation

Go to `localhost:{PORT}/docs` to see documentation API

or

Go to Postman DOC for the `[LATEST API]` Documentation
https://documenter.getpostman.com/view/12008621/2s8Ysp1F8v

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/express-generator.svg
[npm-url]: https://npmjs.org/package/express-generator
[appveyor-image]: https://img.shields.io/appveyor/ci/dougwilson/generator/master.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/dougwilson/generator
[downloads-image]: https://img.shields.io/npm/dm/express-generator.svg
[downloads-url]: https://npmjs.org/package/express-generator
[github-actions-ci-image]: https://img.shields.io/github/workflow/status/expressjs/generator/ci/master?label=linux
[github-actions-ci-url]: https://github.com/expressjs/generator/actions/workflows/ci.yml
