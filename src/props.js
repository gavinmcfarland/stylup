const side = {
	top: { _abbr: 't' },
	right: { _abbr: 'r' },
	bottom: { _abbr: 'b' },
	left: { _abbr: 'l' }
};

export default {
	margin: {
		...(() => {
			return side;
		})(),
		_abbr: 'm'
	},
	padding: {
		...(() => {
			return side;
		})(),
		_abbr: 'p'
	}
};
