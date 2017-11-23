
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new UglifyJsPlugin(),
  ],
});
