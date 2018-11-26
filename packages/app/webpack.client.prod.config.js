'use strict';

const { resolve } = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const config = {
  entry: resolve('src', 'client', 'index.tsx'),
  output: {
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].[id].bundle.js'
  },
  plugins: [new webpack.optimize.AggressiveMergingPlugin(), new ManifestPlugin(), new GenerateSW()],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
};

module.exports = config;
