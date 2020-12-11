const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProduction = (process.env.NODE_ENV === 'production');

const SOURCE_PATH = path.resolve(__dirname, 'source');
const BUILD_PATH = path.resolve(__dirname, 'build');

module.exports = {
	watch: !isProduction,
	mode: process.env.NODE_ENV,
	devtool: isProduction ? false : 'inline-source-map',
	stats: 'minimal',

	entry: SOURCE_PATH + '/index.jsx',
	output: {
		path: BUILD_PATH,
		publicPath: isProduction ? './' : '',
		filename: isProduction ? 'static/scripts/app.[hash:8].js' : 'static/scripts/app.js',
		chunkFilename: isProduction ? 'static/scripts/[name].[chunkhash:8].js' : 'static/scripts/[name].chunk.js'
	},

	devServer: {
		open: true,
		contentBase: BUILD_PATH,
		stats: 'minimal',
		overlay: false,
		clientLogLevel: 'none',
		compress: true,
		port: 1337,
		hot: true,
		historyApiFallback: true
	},

	optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				react: {
					test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
					name: 'react',
					chunks: 'all'
				}
			}
		},
		runtimeChunk: true
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				enforce: 'pre',
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					fix: false,
					cache: false,
					eslintPath: require.resolve('eslint')
				}
			}, {
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						'@babel/preset-env',
						'@babel/preset-react'
					]
				}
			}, {
				test: /\.(sass|scss)$/,
				loader: 'sass-loader',
				enforce: 'pre',
				options: {
					sourceMap: !isProduction,
					includePaths: [ path.join(__dirname, 'node_modules') ]
				}
			}, {
				test: /\.(sass|scss|css)$/,
				use: [
					isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: !isProduction,
							modules: false,
							camelCase: true,
							importLoaders: 1
						}
					}, {
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [
								require('postcss-preset-env'),
								require('cssnano')({
									autoprefixer: isProduction,
									discardUnused: isProduction,
									mergeIdents: isProduction,
									reduceIdents: isProduction,
									svgo: false,
									zindex: false
								})
							],
							sourceMap: !isProduction
						}
					}
				]
			}
		]
	},

	resolve: {
		extensions: [ '.js', '.jsx' ],
		alias: {
			Components: path.resolve(SOURCE_PATH, 'components'),
			Styles: path.resolve(SOURCE_PATH, 'sass')
		}
	},

	plugins: [
		isProduction && new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [ '*' ],
			verbose: false
		}),
		!isProduction && new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			hash: true,
			minify: isProduction && {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			filename: './index.html',
			template: SOURCE_PATH + '/views/index-template.html'
		}),
		isProduction && new MiniCssExtractPlugin({
			filename: 'static/styles/app.[contenthash:8].css',
			chunkFilename: 'static/styles/[name].[contenthash:8].css'
		})
	].filter(Boolean)
};