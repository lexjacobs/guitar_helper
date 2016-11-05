/* global module process require __dirname */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackStripLoader = require('strip-loader');

const TARGET = process.env.npm_lifecycle_event;
console.log('target event is ' + TARGET);

var common = {
  cache: true,
  debug: true,
  entry: {
    bundle: './app/index.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    filename: './[name].js',
    path: __dirname + '/dist'
  },
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'html'
    },{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel',
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!postcss-loader!sass-loader'
    }, {
      test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff2'
    }, {
      test: /\.(ttf|eot|svg|gif|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }],
    preLoaders: [{
      test: /\.jsx?$/,
      loaders: ['eslint-loader'],
      exclude: /node_modules/,
      include: __dirname
    }]
  }
};

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

/*
TARGET NAMES must correspond to 'npm run' task names in package.json
*/

if (TARGET === 'start' || !TARGET) {

  module.exports = Object.assign(common, {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      historyApiFallback: true,
      contentBase: './dist',
      hot: true
    },
    plugins: [new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
      new webpack.HotModuleReplacementPlugin(),
      HTMLWebpackPluginConfig]
  });
}

if (TARGET === 'build') {

  var stripLoader = {
    test: [/\.jsx?$/],
    exclude: /node_modules/,
    loader: WebpackStripLoader.loader('console.log')
  };
  common.module.loaders.push(stripLoader);

  module.exports = Object.assign(common, {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: true
        }
      }),
      HTMLWebpackPluginConfig
    ]
  });
}
