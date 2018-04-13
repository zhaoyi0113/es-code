
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');

const GlobalizePlugin = require('globalize-webpack-plugin');
const commonGlobalizePluginOptions = require('./commonGlobalizePluginOptions');
const common = require('./common');

module.exports = merge.strategy({
  'entry.main': 'prepend',
  'entry.performance': 'prepend',
  'module.rules': 'prepend',
  plugins: 'prepend'
})(common, {
	entry: {
    // activate HMR for React
    main: ['react-hot-loader/patch'],
	},
	devtool: 'source-map',
  devServer: {
    // enable HMR on the server
    hot: true,

    // match the output path
    contentBase: path.resolve(__dirname, '../dist'),

    // match the output `publicPath`
    publicPath: '/ui/',
    port: 5000,
    host: '0.0.0.0'
	},
	module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
	},
	plugins: [
    new DashboardPlugin({
      minified: false,
      gzip: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    // enable HMR globally
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new GlobalizePlugin(
      merge(commonGlobalizePluginOptions, {
        production: false
      })
    )
  ]
});
