'use strict';

const { resolve } = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const config = {
  entry: resolve('src', 'client', 'index.tsx'),
  output: {
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].[id].bundle.js',
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new WebpackManifestPlugin(),
    new GenerateSW(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};

module.exports = config;
