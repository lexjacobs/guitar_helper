/* global module process require __dirname */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackStripLoader = require('strip-loader');

const TARGET = process.env.NODE_ENV;
console.log('target event is ' + TARGET);

var common = {
  cache: true,
  debug: true,
  // entry specified below, specific to production | development
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    filename: './[name].js',
    path: __dirname + '/dist/',
    publicPath: './'
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
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

if (TARGET !== 'production' || !TARGET) {

  module.exports = Object.assign(common, {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      historyApiFallback: true,
      contentBase: './dist',
      hot: true
    },
    entry: [

      // for hot style updates
      'webpack/hot/dev-server',
      // refreshing the browser on hot updates
      'webpack-dev-server/client?http://localhost:8080',
      // our application
      // mainPath
      './app/index.js',
    ],
    plugins: [new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
      new webpack.HotModuleReplacementPlugin(),
      HTMLWebpackPluginConfig]
  });
}

if (TARGET === 'production') {

  var stripLoader = {
    test: [/\.jsx?$/],
    exclude: /node_modules/,
    loader: WebpackStripLoader.loader('console.log')
  };
  common.module.loaders.push(stripLoader);

  module.exports = Object.assign(common, {
    entry: [
      './app/index.js',
    ],
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
