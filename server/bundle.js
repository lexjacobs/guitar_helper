/* global module require */
var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./../webpack.config.js');

module.exports = function(){
  // initialize web pack and pass in the configuration
  var bundleStart = null;
  var compiler = Webpack(webpackConfig);
  // give notice in terminal when bundling starts
  compiler.plugin('compile', function(){
    console.log('Bundling...');
    bundleStart = Date.now();
  });
  // notice when compilation is finished
  compiler.plugin('done', function(){
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
    bundleStart = Date.now();
  });

  var bundler = new WebpackDevServer(compiler, {
    // d webexto serve bundled application from build path
    // proxy 3000/build -> 8080/build
    publicPath: '/dist/',
    // configure hot replacement
    hot: true,
    // terminal configurations
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  // fire up development server and give notice in terminal
  bundler.listen(8080, 'localhost', function(){
    console.log('Bundling project, please wait...');
  });

};
