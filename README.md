# livery ⟳

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url]

A simple static-file server with live reload support for development. The word itself derives from the French _livrée_, meaning _dispensed_ or _handed over_.

## Install

Install the [LiveReload](http://livereload.com/extensions/) browser extensions.

```command
$ npm install --global livery
```

## Usage

```man
Usage: livery [options] [path]
       lr [options] [path]

Options:
  -d, --delay    Debounce delay for reloads. (default: 250)
  -g, --glob     Glob of files to watch. (default: '**/*.*')
  -h, --help     Output usage information.
  -p, --port     HTTP server port. (default: 3000)
  -s, --spa      Single-page app. If string, path to html. (default: false)

Examples:
  $ lr
  $ lr src
  $ livery --glob 'src/**/*.*' --glob 'test/**/*.js' --spa -- dist
  $ livery --delay 1000 --spa /spa.html
```

## API

### `livery([options]): Object`

- `glob` `{String|Array}` Glob patterns to watch (default: `**/*`)
- `options` `{Object}`
  - `delay` `{Number}` Debounce delay for reloads. (default: `250`)
  - `glob` `{String|Array}` Glob or globs of files to watch. (default: `**/*.*`)
  - `port` `{Number}` HTTP server port. (default: `3000`)
  - `spa` `{Boolean|String}` Single-page app. If string, path to html. (default: `false`).

Starts an HTTP server, LiveReload server, and file watcher.

```js
const livery = require('livery');
const { httpServer, liveServer, watcher } = livery({
    delay: 250,
    glob: '**/*.*',
    port: 3000,
    spa: false,
});
```

----

MIT © [Shannon Moeller](http://shannonmoeller.com)

[downloads-img]: http://img.shields.io/npm/dm/livery.svg?style=flat-square
[npm-img]:       http://img.shields.io/npm/v/livery.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/livery
