var express = require('express');
var httpProxy = require('http-proxy');

var options = {
  router: {
    'ecigtv.com': '127.0.0.1:4000',
    'lavacorps.internationalvapersclub.com': '127.0.0.1:3001'
  }
}
var proxy = httpProxy.createServer(options);
proxy.listen(3000);

var app = express.createServer();

app.configure(function() {
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);

  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.get('/', function(req, res) {
  res.render('index.ejs', { layout: false });
});

app.get('*', function(req, res) {
  res.redirect('/');
});

app.listen(4000);