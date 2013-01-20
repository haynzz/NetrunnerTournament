
var data = require( './../data' ),
	date = require( './../date' );

var index = function( req, res ){
  res.render( 'index', { title: 'Netrunner Tournament' });
};

var getData = function( req, res ){
	data.read( function( error, savedData ){
		if( error ) console.log( error );
		res.end( JSON.stringify( savedData ));
	});
}

var addPlayers = function( req, res ){
	data.read( function( error, savedData ){
		var parsed = JSON.parse( req.body.data );
		if( !savedData.players ) savedData.players = [];
		for( i in savedData.players ){
			for( j in parsed ){
				if( savedData.players[i].email == parsed[j].email ){
					parsed[j].exists = true;
					break;
				}
			}
		}
		for( j in parsed ){
			if( !parsed[j].exists ){
				savedData.players.push( parsed[j] );
			}
		}
		data.write( savedData );
		res.end( JSON.stringify( savedData ));
	});
}

var addEvent = function( req, res ){
	data.read( function( error, savedData ){
		var parsed = JSON.parse( req.body.data );
		parsed.dateCreated = date.parse( parsed.dateCreated );
		if( !savedData.events ) savedData.events = [];
		savedData.events.push( parsed );
		data.write( savedData );
		res.end( JSON.stringify( savedData ));
	});
}

exports.index   = index;
exports.getData = getData;
exports.addPlayers = addPlayers;
exports.addEvent = addEvent;