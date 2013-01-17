var fs   = require( 'fs' );

var write = function( toSave ){
	var fileName = 'saveData/data.json';
	fs.writeFile( fileName, JSON.stringify( toSave ));
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