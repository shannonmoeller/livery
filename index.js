const { Gaze } = require('gaze');
const { Server } = require('tiny-lr');

function debounce(fn, ms, timer) {
	return (...args) => {
		timer = clearTimeout(timer);
		timer = setTimeout(fn, ms, ...args);
	};
}

function normalizeOptions(options) {
	return Object.assign(
		{
			delay: 100,
			glob: '**/*',
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
			watcherOptions: Object.assign({}, options.watcherOptions),
		}
	);
}

function livery(options) {
	const {
		delay,
		glob,
		port,
		serverOptions,
		watcherOptions,
	} = normalizeOptions(options);

	const server = new Server(serverOptions);
	const watcher = new Gaze(glob, watcherOptions);

	server.listen(port, () => {
		function reload() {
			Object.keys(server.clients).forEach((id) =>
				server.clients[id].reload(['*'])
			);
		}

		watcher.on('all', debounce(reload, delay));
	});

	return {
		server,
		watcher,
	};
}

module.exports = livery;
