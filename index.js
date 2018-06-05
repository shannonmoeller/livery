const chalk = require('chalk');
const chokidar = require('chokidar');
const readline = require('readline');
const { Server } = require('tiny-lr');

function info(message, update) {
	if (update) {
		readline.cursorTo(process.stdout, 0);
		process.stdout.write(chalk`{magenta INFO:} ${message}`);
	} else {
		console.log(chalk`{magenta INFO:} ${message}`);
	}
}

function error(message) {
	console.error(chalk`{red ERROR:} ${message}`);
}

function debounce(fn, ms, timer) {
	return (...args) => {
		timer = clearTimeout(timer);
		timer = setTimeout(fn, ms, ...args);
	};
}

function normalizeGlob(glob) {
	return glob && glob.length ? glob : '**/*';
}

function normalizeOptions(options) {
	return Object.assign(
		{
			delay: 100,
			port: 35729,
		},
		options,
		{
			serverOptions: Object.assign(
				{
					liveCSS: false,
					liveImg: false,
				},
				options.serverOptions
			),
			watcherOptions: Object.assign(
				{
					awaitWriteFinish: true,
					ignored: '**/node_modules/**',
				},
				options.watcherOptions
			),
		}
	);
}

function livery(glob, options) {
	glob = normalizeGlob(glob);
	options = normalizeOptions(options);

	const { delay, port, serverOptions, watcherOptions } = options;
	const server = new Server(serverOptions);
	const watcher = chokidar(glob, watcherOptions);
	let reloadCount = 0;

	function reload() {
		const clientIds = Object.keys(server.clients);

		info(`clients: ${clientIds.length}, reloads: ${++reloadCount}`, true);

		clientIds.forEach((id) => server.clients[id].reload(['*']));
	}

	server.listen(port, () => {
		info(`Broadcasting reload events at http://localhost:${port}`);

		watcher.on('all', debounce(reload, delay));
	});

	server.on('error', error);
	watcher.on('error', error);

	return {
		server,
		watcher,
	};
}

module.exports = livery;
