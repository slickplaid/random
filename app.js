var express = require('express');
var httpProxy = require('http-proxy');

var options = {
  router: {
    'ecigtv.com': '127.0.0.1:4000',
    'www.ecigtv.com': '127.0.0.1:4000',
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

  app.set('views', __dirname+'/views');
  app.register('.html', require('ejs'));
  app.set('view engine', 'html');
  app.set('view options', { layout: 'layouts/layout' });

});

app.get('*', function(req, res, next) {
  if(req.header('host') !== 'ecigtv.com') {
    res.redirect('http://ecigtv.com/', 301);
  } else {
    next();
  }
});

app.get('/', function(req, res) {
  //res.render('index', { layout: false });
  res.redirect('http://ecigtv.com/live');  
});

app.get('/live', function(req, res) {
  res.render('live', { layout: false });
});

app.get('/google6d38451c2406dbde.html', function(req, res) {
  res.render('google6d38451c2406dbde', { layout: false });
});

app.get('*', function(req, res) {
  res.redirect('http://ecigtv.com/live');
});

app.listen(4000);