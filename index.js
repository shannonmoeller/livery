import http from 'http';
import os from 'os';
import path from 'path';
import chokidar from 'chokidar';
import send from 'send';
import tiny from 'tiny-lr';

const cwd = process.cwd();
const interfaces = os.networkInterfaces();

function debounce(fn, ms) {
	let timer;

	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(fn, ms, ...args);
	};
}

function getIpAddress() {
	const values = Object.values(interfaces).flat();

	for (const { address, family, internal } of values) {
		if (family === 'IPv4' && !internal) {
			return address;
		}
	}
}

export default function livery(dir = '.', options = {}) {
	const {
		delay = 250,
		httpPort = 3000,
		livePort = 35729,
		spa = false,
		watch = '**/*.*',
	} = options;

	const rootPath = path.join(cwd, dir);
	const spaPath = spa === true ? 'index.html' : spa;
	const address = getIpAddress();

	// HTTP Server

	const httpServer = http.createServer((req, res) => {
		console.log(req.method, req.url);

		const { pathname } = new URL(req.url, 'http://localhost');

		function serveSpa(error) {
			const isSpa =
				spaPath &&
				error.statusCode === 404 &&
				req.headers.accept.includes('html');

			if (isSpa) {
				send(req, spaPath, { root: rootPath }).pipe(res);
			} else {
				res.statusCode = error.statusCode || 500;
				res.end();
			}
		}

		send(req, pathname, { root: rootPath }).on('error', serveSpa).pipe(res);
	});

	httpServer.on('error', console.error);
	httpServer.listen(httpPort);

	// LiveReload Server

	const liveServer = new tiny.Server({
		liveCSS: false,
		liveImg: false,
	});

	liveServer.on('error', console.error);
	liveServer.listen(livePort);

	function reload() {
		console.log('RELOAD');

		for (const client of Object.values(liveServer.clients)) {
			client.reload(['*']);
		}
	}

	// File Watcher

	const fileWatcher = chokidar.watch(watch, {
		ignored: '**/node_modules/**',
		ignoreInitial: true,
		persistent: true,
	});

	fileWatcher.on('error', console.error);
	fileWatcher.on('all', debounce(reload, delay));

	// Report

	console.log(`HTTP Server:  http://${address}:${httpPort}`);
	console.log(`Live Server:  http://${address}:${livePort}`);
	console.log(`File Watcher: ${watch}`);

	return {
		httpServer,
		liveServer,
		fileWatcher,
	};
}
