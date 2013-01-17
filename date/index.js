var today = function(){
	var d    = new Date(),
		yyyy = d.getFullYear(),
		mm   = d.getMonth(),
		dd   = d.getDate();
	return new Date( yyyy, mm, dd, 0, 0, 0, 0 ).getTime();
}

exports.today = today;