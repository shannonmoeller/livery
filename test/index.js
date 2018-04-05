const test = require('blue-tape');
const livery = require('..');

test('should export a function', async (t) => {
	t.equal(typeof livery, 'function');
});
