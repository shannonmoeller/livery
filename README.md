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
Usage: livery [options] [glob ...]
       lr [options] [glob ...]

Options:

  -d, --delay    Milliseconds to delay before reloading (default: `100`)
  -p, --port     LiveReload server port (default: `35729`)
  -h, --help     Output usage information
  -v, --version  Output version number
```

## Examples

```command
$ lr

$ livery --port 34567

$ livery "**/*.js" "**/*.css"
```

## API

### `livery([glob, [options]]): Object`

- `glob` `{String|Array}` Glob patterns to watch (default: `**/*`)
- `options` `{Object}` See [usage](#usage).
  - `delay` `{Number}` Milliseconds to delay before reloading (default: `100`)
  - `port` `{Number}` Livereload server port (default: `35729`)
  - `serverOptions` `{Object}` [`tiny-lr`](http://npm.im/tiny-lr) options
  - `watcherOptions` `{Object}` [`chokidar`](http://npm.im/chokidar) options

Starts a LiveReload server and watches given globs for changes. Returns the server and the watcher instances.

```js
const livery = require('livery');
const { server, watcher } = livery(['**/*.css', '**/*.js']);
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
