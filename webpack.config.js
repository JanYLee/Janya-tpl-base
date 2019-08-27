const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniLessExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const distPath = path.resolve(__dirname, 'dist');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'development', // development, production
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: distPath,
  },
  devServer: {
    port: 3000,
    progress: true,
    contentBase: distPath
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniLessExtractPlugin({
      filename: devMode ? 'style.css' : 'style.[hash:8].css'
    })
  ],
  module: {
    rules: [
      { test: /\.css$/, use: [MiniLessExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: [MiniLessExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'] },

      { 
        test: /\.js$/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose" : true }],
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCssAssetsPlugin()
    ]
  }
}