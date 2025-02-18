// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	devtool: "eval-source-map",
	devServer: {
		static: path.resolve(__dirname, "dist"),
		watchFiles: ["./src/template.html"],
		hot: true,
		port: 3000,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/template.html",
		}),
	],
	resolve: {
		fallback: {
			fs: false,
			dns: false,
			net: false,
			os: require.resolve("os-browserify/browser"),
			crypto: require.resolve("crypto-browserify"),
			stream: require.resolve("stream-browserify"),
			url: require.resolve("url/"),
			http: require.resolve("stream-http"),
			tls: false,
			path: require.resolve("path-browserify"),
			assert: require.resolve("assert/"),
		},
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
		],
	},
};
