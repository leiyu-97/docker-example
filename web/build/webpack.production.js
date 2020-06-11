const webpack = require('webpack')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const config = require('./webpack.config')

const { NODE_ENV } = process.env

module.exports = merge(
  config,
  {
    mode: 'production',

    entry: ['@babel/polyfill', path.resolve(__dirname, '../demo/index.js')],

    output: {
      filename: '[name].[chunkhash:8].js',
      path: path.resolve(__dirname, '../dist'),
    },

    plugins: [
      new CleanWebpackPlugin(path.resolve(__dirname, '../dist/'), {
        root: path.resolve(__dirname, '../'),
        verbose: true,
        dry: false,
      }),
      new CopyWebpackPlugin([{ from: path.resolve(__dirname, '../static'), to: '' }]),
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, '../index.html'),
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: `"${NODE_ENV}"`,
          BASE_API: '"/api"',
        },
      }),
    ],

    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
)
