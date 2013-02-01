var formatdate = function( d ){
	var d     = new Date( d ),
		year  = d.getFullYear(),
		month = d.getMonth() + 1,
		day   = d.getDate();
	return year + '.' + month + '.' + day;
}

var listEvents = function( data ){
	$( '.chooseEvent tbody' ).empty();
	for( n in data.events ){
		$( '.chooseEvent tbody' ).append( 
			'<tr><td>' + data.events[n].name + '</td><td>' + formatdate( data.events[n].dateCreated ) + '</td></tr>'
		);
		if( data.events[n].players && data.events[n].players.length > 0 ){
			$( '.chooseEvent tbody tr' ).last().append(
				'<td><a href="javascript:void(0);" class="showPlayers">Show Players</a></td>' +
				'<td><a href="javascript:void(0);" class="addPlayers">Add Players</a></td>'
			);
			for( m in data.events[n].players ){
				$( '.chooseEvent tbody' ).append(
					'<tr class="players"><td>' + data.events[n].players[m].name + '</td><td>' + data.events[n].players[m].email + '</td></tr>'
				);
			}
		} else {
			$( '.chooseEvent tbody tr' ).last().append(
				'<td></td>' +
				'<td><a href="javascript:void(0);" class="addPlayers">Add Players</a></td>'
			);
		}
	}
}

var listPlayers = function( data, eventPos ){
	$( '.selectPlayers tbody' ).empty();
	for( n in data.players ){
		var flag = true;
		for( m in data.events[eventPos].players ){
			flag = data.players[n].email == data.events[eventPos].players[m].email ? false : true;
		}
		if( flag ){
			$( '.selectPlayers tbody' ).append(
				'<tr><td><input type="checkbox"/>' + data.players[n].name + '</td><td>' + data.players[n].email + '</td></tr>'
			);
		}
	}
}

var whatToShow = function( data ){
	window.data = data
	console.log( 'inside what to show', window.data );
	if( window.data.error && window.data.errorText ){
		$( '.error' ).empty().html( window.data.errorText ).show();
	} else {
		$( '.error' ).hide();
	}
	if( !window.data.players || window.data.players.length <= 0 ){
		$( '.addPlayesForm' ).show();
	} else {
		if( window.data.events && window.data.events.length > 0 ){
			console.log( 'there are events' );
			$( '.chooseEvent' ).show();
			listEvents( window.data );
		} else {
			console.log( 'there are no events' );
			$( '.addEvent' ).show();
		}
	}
}



$( document ).ready( function(){
	$.ajax({
		url: '/data',
		type: 'GET',
		dataType: 'json' 
	}).success( function( data ){
		whatToShow( data );
	});

	/**
	 * Adding Players
	 **/

	/**
	 * This function controles the + and _ buttons to control the number of players you are adding at once
	 **/
	$( '.addPlayesForm form' ).on( 'click', function( event ){
		if(  event.target.attributes && event.target.attributes.length >= 2 ){
			if( event.target.attributes[1].value == '+' ){
				var cPos = $( event.target ).parents( '.player' ).index();
				$( '.player' ).eq( cPos ).after(
					$( '.player' ).eq( cPos ).clone()
				);
				$( '.player' ).eq( cPos + 1 ).find( 'input[type="text"], input[type="email"]' ).val( '' );
			} else if( event.target.attributes[1].value == '-' ){
				var cPos = $( event.target ).parents( '.player' ).index();
				$( '.player' ).eq( cPos ).remove();
			}
		}
	});

	/**
	 * This function submits the players to the server for saving
	 **/
	$( '.addPlayesForm form .submit' ).on( 'click', function(){
		$( '.addPlayesForm' ).hide();
		var dataToSubmit = [];
		$( '.player' ).each( function(){
			var current = {
				name  : $( this ).find( 'input[type="text"]' ).val(),
				email : $( this ).find( 'input[type="email"]' ).val()
			}
			dataToSubmit.push( current );
		});
		$.ajax({
			url      : '/addPlayers',
			type     : 'POST',
			data     : 'data=' + JSON.stringify( dataToSubmit ),
			dataType : 'json' 
		}).success( function( data ){
			whatToShow( data );
		});
	});

	/**
	 * This function creates new events
	 **/
	$( '.addEvent .submit' ).on( 'click', function(){
		$( '.addEvent' ).hide();
		$.ajax({
			url      : '/addEvent',
			type     : 'POST',
			data     : 'data=' + JSON.stringify( { name : $( '.addEvent #name' ).val(), dateCreated : $( '.addEvent #date' ).val() } ),
			dataType : 'json' 
		}).success( function( data ){
			whatToShow( data );
		});
	});
	$( '.chooseEvent .submit' ).on( 'click', function(){
		$( '.chooseEvent' ).hide();
		$( '.addEvent' ) .show();
	});

	/**
	 * This function assigns players to events
	 **/
	 $( '.chooseEvent table' ).on( 'click', function( event ){
		if( $( event.target ).hasClass( 'addPlayers' )){
			$( '.chooseEvent' ).hide();
			$( '.selectPlayers' ).show();
			var eventPos = $( event.target ).parents( 'tr' ).index();
			console.log( eventPos );
			listPlayers( window.data, eventPos );
		}
	 });
	$( '.selectPlayers .submit' ).on( 'click', function(){
		$( '.selectPlayers' ).hide();
		$( '.addPlayesForm' ) .show();
	});

	/**
	 * This function adds some dummyPlayers plyers for testing
	 **/
	$( '.addPlayesForm form .dummyPlayers' ).on( 'click', function(){
		var dummyPlayersData = [
			{ name : 'Player 1', email : 'player1@test.com' },
			{ name : 'Player 2', email : 'player2@test.com' },
			{ name : 'Player 3', email : 'player3@test.com' },
			{ name : 'Player 4', email : 'player4@test.com' },
			{ name : 'Player 5', email : 'player5@test.com' },
			{ name : 'Player 6', email : 'player6@test.com' },
			{ name : 'Player 7', email : 'player7@test.com' },
			{ name : 'Player 8', email : 'player8@test.com' },
			{ name : 'Player 9', email : 'player9@test.com' },
			{ name : 'Player 10', email : 'player10@test.com' }
		];
		while( dummyPlayersData.length > 0 ){
			var current = dummyPlayersData.shift(),
				$player = $( '.player' ).last();
			$player.find( 'input[type="text"]' ).val( current.name );
			$player.find( 'input[type="email"]' ).val( current.email );
			if( dummyPlayersData.length > 0 ){
				$player.find( 'input[value="+"]' ).click();
			}
		}
	});
});
