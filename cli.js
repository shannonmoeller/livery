#!/usr/bin/env node

import minimist from 'minimist';
import livery from './index.js';

const usage = `
Usage: livery [options]
       lr [options]

Options:
  -g, --glob     glob of files to watch (default: \`**/*.*\`)
  -h, --help     Output usage information
  -l, --lr       tiny-lr server port (default: \`35729\`)
  -p, --port     http server port (default: \`3000\`)
`;

const args = minimist(process.argv, {
	alias: {
		g: 'glob',
		h: 'help',
		l: 'lr',
		p: 'port',
	},
});

if (args.help) {
	console.log(usage.trim());
} else {
	livery(args);
	process.stdin.pipe(process.stdout);
}
