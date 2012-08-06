
/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	path = require('path'),
	fs = require('fs'),
	Bliss = require('bliss'),
	bliss = new Bliss({
		ext: '.jshtml',
		cacheEnabled: true,
		context: {}
	});

var app = express();

app.engine('jshtml', function (path, options, callback) {
	callback(null, bliss.render(path, options));
})

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jshtml');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function (){
  app.use(express.errorHandler());
});

require('./apps/authentication/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
