# livery ⟳

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url]

CLI to reload browsers when files change.

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
  -g, --glob     glob of files to watch (default: \`**/*.*\`)
  -h, --help     output usage information
  -p, --port     http server port (default: \`3000\`)
```

## Examples

```command
$ lr
$ livery --port 8080
```

## API

### `livery([options]): Object`

- `glob` `{String|Array}` Glob patterns to watch (default: `**/*`)
- `options` `{Object}` See [usage](#usage).
  - `glob` `{String}` glob of files to watch (default: \`**/*.*\`)
  - `port` `{Number}` http server port (default: \`3000\`)

Starts an http server, LiveReload server, and file watcher.

```js
const livery = require('livery');
const { httpServer, tinyServer, watchServer } = livery({
    glob: ['**/*.css', '**/*.js'],
    port: 8080,
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
