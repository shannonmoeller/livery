# livery ⟳

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url]

Minimal development server to watch and dispense static files.

## Install

Install the [LiveReload](http://livereload.com/extensions/) browser extensions.

```command
$ npm install --global livery
```

## Usage

```man
Usage: livery [<options>] [--] [<dir>]
       lr [<options>] [--] [<dir>]

Options:
  -d, --delay    Debounce delay for reloads. (default: 250)
  -h, --help     Output usage information.
  -l, --live     LiveReload server port. (default: 35729)
  -p, --port     HTTP server port. (default: 3000)
  -s, --spa      Single-page app. If string, path to html. (default: false)
  -w, --watch    Glob or globs of files to watch. (default: '**/*.*')

Examples:
  $ lr
  $ lr -p 8080 public
  $ livery --watch 'src/**/*.*' --watch 'test/**/*.js' dist
  $ livery --spa -- static
  $ livery --spa app.html
```

## API

### `livery([dir, [options]]): Object`

- `dir` `{String}` Directory of static files. (default: `.`)
- `options` `{Object}`
  - `delay` `{Number}` Debounce delay for reloads. (default: `250`)
  - `httpPort` `{Number}` HTTP server port. (default: `3000`)
  - `livePort` `{Number}` LiveReload server port. (default: `35729`)
  - `spa` `{Boolean|String}` Single-page app. If string, path to html. (default: `false`).
  - `watch` `{String|Array}` Glob or globs of files to watch. (default: `**/*.*`)

Starts an HTTP server, LiveReload server, and file watcher.

```js
const livery = require('livery');
const { httpServer, liveServer, fileWatcher } = livery({
    delay: 250,
    httpPort: 3000,
    livePort: 35729,
    spa: false,
    watch: '**/*.*',
});
```

----

MIT © [Shannon Moeller](http://shannonmoeller.com)

[downloads-img]: http://img.shields.io/npm/dm/livery.svg?style=flat-square
[npm-img]:       http://img.shields.io/npm/v/livery.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/livery
