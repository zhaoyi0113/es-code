
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const GlobalizePlugin = require('globalize-webpack-plugin');
const commonGlobalizePluginOptions = require('./commonGlobalizePluginOptions');
const common = require('./common');

const ENABLE_SOURCE_MAP = true;

module.exports = merge(
  merge.strategy({
    'module.rules': 'prepend',
    plugins: 'prepend'
  })(common, {
    output: {
      path: path.resolve(__dirname, '../dist/ui/'),
      publicPath: './',
      filename: '[name].[hash].js',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
            {
                loader: 'css-loader',
                options: {
                    url: false,
                    minimize: true,
                    sourceMap: false
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: false
                }
            }
          ]
          })
        }
      ]
    },
    devtool: ENABLE_SOURCE_MAP ? 'source-map' : false,
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename: 'commons.js',
        chunks: ['main']
      }),
      new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true
      }),
      // new OptimizeCssAssetsPlugin({
      //   cssProcessor: require('cssnano'),
      //   cssProcessorOptions: {
      //     safe: true,
      //     discardComments: { removeAll: true }
      //   }
      // }),
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: ENABLE_SOURCE_MAP,
        uglifyOptions: {
          ecma: 6,
          compress: true,
          output: {
            comments: false,
            beautify: false
          }
        }
      }),
      new GlobalizePlugin(
        merge(commonGlobalizePluginOptions, {
          // because of statical extraction, we need to change our way of using Globalize in order
          // to enable this
          production: false
        })
      )
    ]
  })
);
