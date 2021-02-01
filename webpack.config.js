const path = require('path');
// const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './index.ts'
  },
  devtool: 'cheap-source-map',
  module:{   // new add +
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: { // new add +
    extensions: [ '.tsx', '.ts',  '.js' ]    
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new HTMLWebpackPlugin({
    //   title: '全局引入lodash'
    // }),
    // new webpack.HashedModuleIdsPlugin(),
    // new webpack.ProvidePlugin({
    //   lod: 'lodash'
    // })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};