import http from 'http';
import chokidar from 'chokidar';
import ip from 'ip';
import send from 'send';
import tiny from 'tiny-lr';

function debounce(fn, ms = 250, timer) {
	return (...args) => {
		timer = clearTimeout(timer);
		timer = setTimeout(fn, ms, ...args);
	};
}

export default function livery(options) {
	const { glob = '**/*.*', port = 3000, spa = false } = options || {};
	const address = ip.address();
	const root = process.cwd();

	const httpServer = http.createServer((req, res) => {
		function serveSpa(error) {
			const isSpa =
				spa &&
				error.statusCode === 404 &&
				req.headers.accept.includes('html');

			if (isSpa) {
				const path = spa === true ? '/index.html' : spa;
				send(req, path, { root }).pipe(res);
			} else {
				res.statusCode = error.statusCode || 500;
				res.end();
			}
		}

		send(req, req.url, { root }).on('error', serveSpa).pipe(res);
	});

	httpServer.on('error', console.error);
	httpServer.listen(port, () => {
		console.log(`http://${address}:${port}`);
	});

	const tinyServer = new tiny.Server({
		liveCSS: false,
		liveImg: false,
	});

	tinyServer.on('error', console.error);
	tinyServer.listen(35729, () => {
		console.log(`http://${address}:35729`);
	});

	const watchServer = chokidar.watch(glob, {
		ignored: '**/node_modules/**',
		ignoreInitial: true,
		persistent: true,
	});

	watchServer.on('error', console.error);
	watchServer.on(
		'all',
		debounce(() => {
			console.log('RELOAD');
			Object.keys(tinyServer.clients).forEach((id) =>
				tinyServer.clients[id].reload(['*'])
			);
		})
	);

	return {
		httpServer,
		tinyServer,
		watchServer,
	};
}
