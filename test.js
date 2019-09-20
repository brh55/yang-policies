import test from 'ava';
import yang2020Policies from '.';

test('title', t => {
	t.throws(() => {
		yang2020Policies(123);
	}, {
		instanceOf: TypeError,
		message: 'Expected a string, got number'
	});

	t.is(yang2020Policies('unicorns'), 'unicorns & rainbows');
});
