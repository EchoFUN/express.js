/**
 * Module dependencies.
 */

var express = require('express'), http = require('http'), path = require('path');

var map = require('./map');

var app = express();

var logger = express.logger(':remote-addr : visite the host(:date)');

app.configure(function() {
   app.use(function(req, res, next) {
      if (!(/\.(png|jpg|gif|jpeg)$/i).test(req.path)) {
         logger(req, res, next);
      } else {
         next();
      }
   });
   app.set('port', process.env.PORT || 3000);
   app.set('views', __dirname + '/views');
   app.set('view engine', 'ejs');
   app.use(express.favicon());
   app.use(express.bodyParser());
   app.use(express.methodOverride());
   app.use(express.static(path.join(__dirname, 'public')));
   app.use(app.router);
});

app.configure('development', function() {
   app.use(express.errorHandler());
});

map(app);

http.createServer(app).listen(app.get('port'), function() {
   // console.log("Express server listening on port " + app.get('port'));
});
