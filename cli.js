#!/usr/bin/env node

import minimist from 'minimist';
import livery from './index.js';

const usage = `
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
`;

const args = minimist(process.argv.slice(2), {
	alias: {
		d: 'delay',
		h: 'help',
		l: ['live', 'livePort'],
		p: ['port', 'httpPort'],
		s: 'spa',
		w: 'watch',
	},
});

if (args.help) {
	console.log(usage.trim());
} else {
	livery(args._[0], args);
	process.stdin.pipe(process.stdout);
}
