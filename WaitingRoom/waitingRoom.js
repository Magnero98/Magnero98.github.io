/* include '../ajaxHelper.js' */
/* include '../authenticatePlayer.js' */
/* include '../RoomState.js' */

$(document).ready(function(){
    
    renderPlayerData();
    //searchingForOpponent();

    $('#readyBtn').click(function(){
    	setPlayerReady() // RoomState.js
    });

     $('#exitBtn').click(function(){
    	isRedirected = true;
    	exitGame();
    });

});

$(window).on('beforeunload', function(){
    if(!isRedirected)
        unauthenticate(); // sessionHelper.js
});

function renderOpponentData(opponent)
{
	$('#opponentName').text(opponent.username);
	$('#opponentStatus').text("Not Ready");

	if(opponent.gender == "Male")
		$('#opponentImg').attr('src', 'https://res.cloudinary.com/black-pearls/image/upload/v1550398551/RPS/Players/boy.svg');
	else
		$('#opponentImg').attr('src', 'https://res.cloudinary.com/black-pearls/image/upload/v1550398551/RPS/Players/girl.svg');
}

function renderPlayerData()
{
	$('#playerName1').text(getAuthPlayer().username); // include '../sessionHelper.js' 
	$('#playerName2').text(getAuthPlayer().username); // include '../sessionHelper.js' 
	$('#playerStatus').text("Not Ready");
	$('#playerPoints').text(getAuthPlayer().points); // include '../sessionHelper.js'

	if(getAuthPlayer().gender == "Male") // include '../sessionHelper.js'
	{
		$('#playerImg1').attr('src', 'https://res.cloudinary.com/black-pearls/image/upload/v1550398551/RPS/Players/boy.svg');
		$('#playerImg2').attr('src', 'https://res.cloudinary.com/black-pearls/image/upload/v1550398551/RPS/Players/boy.svg');
	}
	else
	{
		$('#playerImg1').attr('src', 'https://res.cloudinary.com/black-pearls/image/upload/v1550398551/RPS/Players/girl.svg');	
		$('#playerImg2').attr('src', 'https://res.cloudinary.com/black-pearls/image/upload/v1550398551/RPS/Players/girl.svg');	
	}
}

function renderOpponentReset()
{
	$('#opponentName').text("Opponent");
	$('#opponentStatus').text("Not Ready");
	$('#opponentImg').attr('src', 'https://res.cloudinary.com/black-pearls/image/upload/v1550398551/RPS/Players/unknown.svg');
}