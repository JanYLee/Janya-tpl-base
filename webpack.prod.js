const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniLessExtractPlugin = require('mini-css-extract-plugin');

const distPath = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: distPath,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
    })
  ],
  module: {
    rules: [
      
    ]
  }
}