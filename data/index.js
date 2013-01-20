var fs   = require( 'fs' );

var write = function( toSave ){
	var fileName = 'saveData/data.json';
	fs.exists( 'savedata/', function( exists ){
		console.log( 'exists', exists );
		if( !exists ){
			fs.mkdir( 'savedata/', function( error, dir ){
				console.log( error, dir );
				fs.writeFile( fileName, JSON.stringify( toSave ));
			});
		} else {
			fs.writeFile( fileName, JSON.stringify( toSave ));
		}
	});
}

var read = function( callback ){
	var fileName = 'saveData/data.json',
		ret      = '';
	fs.exists( fileName, function( exists ){
		if( !exists ){
			return callback( "Save location does not exist", {});
		}
		fs.readFile( fileName, function( error, data ){
			if( error ) callback( error, null );
			callback( null, JSON.parse( data ));
		});
	});
}

exports.write = write;
exports.read = read;