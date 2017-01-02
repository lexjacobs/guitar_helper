/* global require process __dirname */

var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});
var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'dist');

// point to static assets
app.use(express.static(publicPath));

app.all('/proxy', (req, res) => {
  res.send('here I am!');
});

app.all('/test', (req, res) => {
  proxy.web(req, res, {
    target: 'https://guitar-helper-cc2e6.firebaseio.com/',
  });
});

// only run workflow when not in production
if (!isProduction) {
  var bundle = require('./server/bundle.js');
  bundle();
  // proxy requests from 3000 -> dev-server
  app.all('/*', function(req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:8080/dist/'
    });
  });
}

// catch errors from proxy
proxy.on('error', function(e){
  console.log('Could not connect to proxy, please try again...', e);
});
app.listen(port, () => {
  console.log('Server running on port ' + port);
});
