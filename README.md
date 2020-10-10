# livery ⟳

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url]

A simple static-file server with live reload support for development. The word itself derives from the French _livrée_, meaning _dispensed_ or _handed over_.

## Install

Install the [LiveReload](http://livereload.com/extensions/) browser extensions.

```command
$ npm install --global livery
```

## Usage

```man
Usage: livery [options]
       lr [options]

Options:
  -g, --glob     Glob of files to watch. (default: '**/*.*')
  -h, --help     Output usage information.
  -p, --port     HTTP server port. (default: 3000)
  -s, --spa      Single-page app. (default: false)
```

## Examples

```command
$ lr
$ livery --spa
$ livery --port 8080 --spa /spa.html
```

## API

### `livery([options]): Object`

- `glob` `{String|Array}` Glob patterns to watch (default: `**/*`)
- `options` `{Object}` See [usage](#usage).
  - `glob` `{String}` Glob of files to watch. (default: `**/*.*`)
  - `port` `{Number}` HTTP server port. (default: `3000`)
  - `spa` `{Boolean|String}` Whether to serve as a single-page app. If a string, which path to serve. (default: `false`).

Starts an http server, LiveReload server, and file watcher.

```js
const livery = require('livery');
const { httpServer, tinyServer, watchServer } = livery({
    glob: ['**/*.css', '**/*.js'],
    port: 8080,
    spa: '/spa.html',
});
```

----

MIT © [Shannon Moeller](http://shannonmoeller.com)

[coveralls-img]: http://img.shields.io/coveralls/shannonmoeller/livery/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/shannonmoeller/livery
[downloads-img]: http://img.shields.io/npm/dm/livery.svg?style=flat-square
[npm-img]:       http://img.shields.io/npm/v/livery.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/livery
[travis-img]:    http://img.shields.io/travis/shannonmoeller/livery.svg?style=flat-square
[travis-url]:    https://travis-ci.org/shannonmoeller/livery
