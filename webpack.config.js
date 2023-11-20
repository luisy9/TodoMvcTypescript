const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');

const basePath = __dirname;

module.exports = {
  context: path.join(basePath, 'src'),
  resolve: {
    alias: {
      pods: path.resolve(__dirname, './src/pods/'),
      views: path.resolve(__dirname, './src/views/'),
      layouts: path.resolve(__dirname, './src/layouts'),
      services: path.resolve(__dirname, './src/services'),
      validators: path.resolve(__dirname, './src/validators'),
      constants: path.resolve(__dirname, './src/constants'),
    },
    extensions: ['.js', '.ts', '.tsx'],
  },
  entry: './app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
};
