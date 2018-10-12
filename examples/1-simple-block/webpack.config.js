const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cleanBuild = new CleanWebpackPlugin(['build']);
const extractCSS = new ExtractTextPlugin('style.css');

module.exports = {
  entry: './src/index.js',
  externals: {
    react: 'React',
    wp: 'wp',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: extractCSS.extract(['css-loader', 'sass-loader']),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
      },
    ],
  },
  mode: 'production',
  plugins: [
    cleanBuild,
    extractCSS,
  ],
};
