#!/usr/bin/env node

import minimist from 'minimist';
import livery from './index.js';

const usage = `
Usage: livery [options] [path]
	   lr [options] [path]

Options:
  -d, --delay    Debounce delay for reloads. (default: 250)
  -g, --glob     Glob of files to watch. (default: '**/*.*')
  -h, --help     Output usage information.
  -p, --port     HTTP server port. (default: 3000)
  -s, --spa      Single-page app. (default: false)

Examples:
  $ lr
  $ lr dist
  $ livery --spa
  $ livery --spa -- dist
  $ livery --delay 1000 --spa /spa.html
  $ livery --glob 'src/**/*.*' --glob 'test/**/*.js'
`;

const args = minimist(process.argv.slice(2), {
	alias: {
		d: 'delay',
		g: 'glob',
		h: 'help',
		p: 'port',
		s: 'spa',
	},
});

if (args.help) {
	console.log(usage.trim());
} else {
	livery(args);
	process.stdin.pipe(process.stdout);
}
