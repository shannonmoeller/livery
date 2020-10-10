import http from 'http';
import path from 'path';
import chokidar from 'chokidar';
import ip from 'ip';
import send from 'send';
import tiny from 'tiny-lr';

function debounce(fn, ms) {
	let timer;

	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(fn, ms, ...args);
	};
}

export default function livery(options) {
	const { delay = 250, glob = '**/*.*', port = 3000, spa } = options || {};
	const address = ip.address();
	const root = path.join(process.cwd(), options._[0] || '.');

	// HTTP Server

	const httpServer = http.createServer((req, res) => {
		console.log(req.method, req.url);

		function serveSpa(error) {
			const isSpa =
				spa &&
				error.statusCode === 404 &&
				req.headers.accept.includes('html');

			if (isSpa) {
				const url = spa === true ? '/index.html' : spa;

				send(req, url, { root }).pipe(res);
			} else {
				res.statusCode = error.statusCode || 500;
				res.end();
			}
		}

		send(req, req.url, { root }).on('error', serveSpa).pipe(res);
	});

	httpServer.on('error', console.error);
	httpServer.listen(port);

	// LiveReload Server

	const liveServer = new tiny.Server({
		liveCSS: false,
		liveImg: false,
	});

	liveServer.on('error', console.error);
	liveServer.listen(35729);

	const reload = debounce(() => {
		console.log('RELOAD');
		Object.keys(liveServer.clients).forEach((id) => {
			liveServer.clients[id].reload(['*']);
		});
	}, delay);

	// File Watcher

	const watcher = chokidar.watch(glob, {
		cwd: root,
		ignored: '**/node_modules/**',
		ignoreInitial: true,
		persistent: true,
	});

	watcher.on('error', console.error);
	watcher.on('add', reload);
	watcher.on('change', reload);
	watcher.on('unlink', reload);

	// Report

	console.log(`HTTP:  http://${address}:${port}`);
	console.log(`Live:  http://${address}:35729`);
	console.log(`Watch: ${glob}`);

	return {
		httpServer,
		liveServer,
		watcher,
	};
}
