const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const {version} = require('./package.json')

const isDev = !process.argv.includes('-p')
const plugins = [
	new webpack.DefinePlugin({
		__VERSION__: JSON.stringify(version)
	}),
	new webpack.ProvidePlugin({
		Component: ['react', 'Component'],
		createElement: ['react', 'createElement'],
		PropTypes: ['react', 'PropTypes']
	}),
	new webpack.optimize.CommonsChunkPlugin({
		minChunks: ({resource}) => /node_modules/.test(resource),
		name: 'vendor'
	}),
	new HtmlPlugin({
		minify: {collapseWhitespace: true},
		template: path.resolve('src/index.html')
	})
].concat(isDev
	? new webpack.NamedModulesPlugin()
	: new ExtractTextPlugin('bundle.[name].css')
)

module.exports = {
	entry: [
		'babel-polyfill',
		path.resolve('src')
	],
	output: {
		filename: 'bundle.[name].js',
		path: path.resolve('public')
	},
	devServer: {
		historyApiFallback: true,
		host: '0.0.0.0',
		stats: 'minimal'
	},
	module: {
		rules: [{
			test: /\.js$/,
			include: path.resolve('src'),
			use: [{
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
					plugins: [
						'transform-regenerator',
						'transform-runtime',
						['transform-react-jsx', {
							pragma: 'createElement'
						}]
					],
					presets: [['env', {
						modules: false
					}], 'react', 'stage-0']
				}
			}]
		}]
	},
	plugins,
	resolve: {
		modules: [
			path.resolve('src'),
			path.resolve('node_modules')
		]
	}
}