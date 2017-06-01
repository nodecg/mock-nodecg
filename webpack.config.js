const path = require('path');

module.exports = {
	entry: './src/mock-nodecg.js',
	output: {
		filename: './dist/mock-nodecg.js'
	},
	resolve: {
		alias: {
			sinon: path.resolve(__dirname, 'browser-stubs/sinon.js')
		}
	},
	devtool: 'source-map'
};
