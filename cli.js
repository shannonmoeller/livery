#!/usr/bin/env node

import minimist from 'minimist';
import livery from './index.js';

const usage = `
Usage: livery [options]
       lr [options]

Options:
  -g, --glob     Glob of files to watch. (default: \`**/*.*\`)
  -h, --help     Output usage information.
  -p, --port     HTTP server port. (default: \`3000\`)
  -s, --spa      Single-page app. (default: \`false\`)

Examples:
  $ lr
  $ livery --spa
  $ livery --glob '**/*.js' --spa /spa.html
`;

const args = minimist(process.argv, {
	alias: {
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
