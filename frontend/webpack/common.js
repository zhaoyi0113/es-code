
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: {
    main: ['babel-polyfill', './index.jsx'],
  },
  output: {
    path: path.resolve(__dirname, '../dist/ui/'),
    publicPath: '/ui/',
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /(node_modules|.tmp-globalize-webpack)/,
        use: ['babel-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
      {
        test: /\.(svg)$/i,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            query: {
              svgo: {
                plugins: [
                  {
                    removeTitle: false
                  }
                ],
                floatPrecision: 2
              }
            }
          }
        ]
      },
      {
        test: /\.(png|woff|eot|ttf|woff2)(\?.*$|$)/,
        loader: 'url-loader?limit=100000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=images/[hash].[ext]'
      },
      {
        test: /\.handlebars|hbs$/,
        loader:
          'handlebars-loader?helperDirs[]=' +
          path.join(__dirname, '../src/helpers/handlebars')
      },
      {
        test: /node_modules\/JSONStream\/index\.js$/,
        use: ['shebang-loader', 'babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.js'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      template: './index.html',
      chunks: ['commons', 'main'],
    }),
  ],
  node: {
    fs: 'empty',
    module: 'empty'
  }
};
