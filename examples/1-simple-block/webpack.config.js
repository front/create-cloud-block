const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cleanBuild = new CleanWebpackPlugin({
  cleanOnceBeforeBuildPatterns: ['build'],
});
const blockCSS = new ExtractTextPlugin('style.css');
const editorCSS = new ExtractTextPlugin('editor.css');

module.exports = {
  entry: {
    index: './src/index.js',
    // scripts: './src/scripts.js',
  },
  externals: {
    react: 'React',
    wp: 'wp',
  },
  output: {
    filename: '[name].js',
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
        exclude: [/node_modules/, /editor\.s?css$/],
        use: blockCSS.extract(['css-loader', 'sass-loader']),
      },
      {
        test: /editor\.s?css$/,
        exclude: /node_modules/,
        use: editorCSS.extract(['css-loader', 'sass-loader']),
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
    blockCSS,
    editorCSS,
  ],
};
