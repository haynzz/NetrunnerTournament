
/**
 * Module dependencies.
 */

var express = require( 'express' ),
	routes  = require( './routes' ),
	http    = require( 'http' ),
	path    = require( 'path' ),
	data    = require( './data' );

var app = express();

app.configure(function(){
	app.set( 'host', process.env.HOST || process.argv[2] || 'localhost' );
	app.set( 'port', process.env.PORT || process.argv[3] || 8888 );
	app.set( 'views', __dirname + '/views' );
	app.set( 'view engine', 'ejs' );
	app.use( express.favicon());
	app.use( express.logger( 'dev' ));
	app.use( express.bodyParser());
	app.use( express.methodOverride());
	app.use( app.router );
	app.use( require( 'less-middleware' )({ src: __dirname + '/public' }));
	app.use( express.static( path.join( __dirname, 'public' )));
});

app.configure( 'development', function(){
  app.use( express.errorHandler());
});

app.get( '/', routes.index );
app.get( '/data', routes.getData );
app.post( '/addPlayers', routes.addPlayers );
app.post( '/addEvent', routes.addEvent );

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening to %s on port %d in %s mode", app.get( 'host' ), app.get( 'port' ), app.settings.env );
});
