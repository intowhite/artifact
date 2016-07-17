module.exports = {
	entry: './src/index.js',
	output: {
		path: __dirname + '/public',
		publicPath: '/public/',
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					plugins: ['transform-decorators-legacy'],
					presets: ['es2015','react','stage-0']
				}
			},
			{
				test: /\.scss$/,
				loaders: ['style','css','sass']
			}
		]
	}
}