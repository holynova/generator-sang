const path = require('path');
// const webpack = require('webpack');
// const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const srcPath = path.resolve(__dirname, 'src');
const dir = {
  js: `${srcPath}/js`,
  style: `${srcPath}/style`,
  imgs: `${srcPath}/imgs`,
};

module.exports = {
  entry: {
    app: [
      `${dir.js}/main.js`,
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'mo9内网导航',
      template: `${srcPath}/index.html`,
      favicon: `${dir.imgs}/icon.png`,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common',
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
    ],
  },
};
