const path = require("path");

module.exports = {
	entry: ["babel-polyfill", "./src/index.js"],
	output: {
		path: path.resolve(__dirname, "public/scripts"),
		filename: "bundle.js",
	},
	devServer: {
		contentBase: path.resolve(__dirname, "public"),
		publicPath: "/scripts/",
		open: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},
	devtool: "source-map",
};
