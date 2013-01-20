var today = function(){
	var d    = new Date(),
		yyyy = d.getFullYear(),
		mm   = d.getMonth(),
		dd   = d.getDate();
	return new Date( yyyy, mm, dd, 0, 0, 0, 0 ).getTime();
}

var parse = function( toParse ){
	var d;
	if( toParse.length > 0 ){
		d = new Date( toParse )
	} else {
		d = new Date ();
	}
	var yyyy = d.getFullYear(),
		mm   = d.getMonth(),
		dd   = d.getDate();
	return new Date( yyyy, mm, dd, 0, 0, 0, 0 ).getTime();
	
}
exports.today = today;
exports.parse = parse;