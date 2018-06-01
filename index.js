const chalk = require('chalk');
const { Gaze } = require('gaze');
const { Server } = require('tiny-lr');

function info(message) {
	console.log(chalk`{magenta INFO:} ${message}`);
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
	glob = glob && glob.length ? glob : '**/*';

	return [].concat(glob, '!**/node_modules/**');
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
					debounceDelay: 100,
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
	const watcher = new Gaze(glob, watcherOptions);

	function reload() {
		info('Reloading connected clients...');

		Object.keys(server.clients).forEach((id) =>
			server.clients[id].reload(['*'])
		);
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
