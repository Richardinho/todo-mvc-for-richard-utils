const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  cache: false,
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs'),
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Richard Todomvc',
    template: './index.html'
  })],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

