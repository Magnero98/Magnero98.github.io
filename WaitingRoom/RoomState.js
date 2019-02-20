/* include '../sessionHelper.js' */
/* include '../ajaxHelper.js' */

var RoomStates = Object.freeze({"Idle":1, "Has2Player":2, "BothPlayerReady":3});
var state = RoomStates.Idle;
var isPlayerReady = false;
var totalReady = 0;
var checkReadyRequest = 0;

$(window).on('beforeunload', function(){
    if(!isRedirected)
        exitGame();
});

/* ================================== Idle State ================================ */

function searchingForOpponent()
{
	$('#gameStatus').text("Searching For Opponent . . .");
	getTotalPlayerInRoom();
}

function getTotalPlayerInRoom()
{
	console.log("searching");
	var url = "http://localhost:8000/api/players/total?roomId=" + getRoomId(); // sessionHelper.js
    var callback = onGetTotalPlayer;

    if(isTokenSet()) // sessionHelper.js
        url += "&token=" + getToken();

    sendGetMethod(url, callback); // ajaxHelper.js
}

function onGetTotalPlayer(data)
{
	if(data['totalPlayer'] < 2)
	{
		getTotalPlayerInRoom();
		return;
	}
	else
	{
		loadOpponentData();
	}

	state = RoomStates.Has2Player;
	checkBothPlayerReadiness();
}

function loadOpponentData()
{
	getOpponentData();
}

function getOpponentData()
{
	if(getGameOpponent() != null)
	{
		renderOpponentData(getGameOpponent());
		return;
	}

	var url = "http://localhost:8000/api/rooms/opponent?roomId=" + getRoomId();
    var callback = onGetOpponentData; 

    if(isTokenSet()) // sessionHelper.js
        url += "&token=" + getToken();

    sendGetMethod(url, callback); // ajaxHelper.js
}

function onGetOpponentData(data)
{
	setGameOpponent(data['opponent']);
	renderOpponentData(getGameOpponent());
}

/* ================================== Has2Player State ================================ */

function checkBothPlayerReadiness()
{
	$('#gameStatus').text("Waiting For Players To Ready . . .");

	if(checkReadyRequest > 7)
	{
		checkReadyRequest = 0;
		if(totalReady == 0)
		{
			alert('You Are Kicked From Room');
			//kickOpponent();
			exitGame();
			return;
		}
		else if(totalReady == 1 && isPlayerReady)
		{
			kickOpponent();
			return;
		}
		else if(totalReady == 1 && !isPlayerReady)
		{
			alert('You Are Kicked From Room');
			exitGame();
			return;
		}
	}

	var url = "http://localhost:8000/api/rooms/data?roomId=" + getRoomId();
    var callback = onCheckBothPlayerReadiness;

    if(isTokenSet()) // sessionHelper.js
        url += "&token=" + getToken();

    sendGetMethod(url, callback); // ajaxHelper.js
}

function onCheckBothPlayerReadiness(data)
{
	checkReadyRequest += 1;
	var players = data['players'];
	var ready = data['ready'];

	if(Object.keys(players).length < 2)
	{
		onOpponentLeft();
	}
	else
	{
		totalReady = Object.keys(ready).length;
		if(totalReady > 1)
		{
			state = RoomStates.BothPlayerReady;
			isRedirected = true;
			window.location = "../GameStage/gameStage.html";
		}

		if(ready != true)
		{
			$.each(ready, function(key, value){
		        if(key != getAuthPlayer().id) // sessionHelper.js
		        	$('#opponentStatus').text("Ready");
		    });
		}	

		checkBothPlayerReadiness();
	}
}

function setPlayerReady()
{
	var url = "http://localhost:8000/api/rooms/player/ready?roomId=" + getRoomId();
    var callback = onSetPlayerReady;

    if(isTokenSet()) // sessionHelper.js
        url += "&token=" + getToken();

    sendGetMethod(url, callback); // ajaxHelper.js
}

function onSetPlayerReady(data)
{
	isPlayerReady = true;
	$('#playerStatus').text("Ready");
}

/* ================================== Player Left Page ================================ */

function onOpponentLeft()
{
	state = RoomStates.Idle;
	renderOpponentReset();
	unsetGameOpponent();
	checkReadyRequest = 0;
	searchingForOpponent();
}

function exitGame()
{
	var url = "http://localhost:8000/api/rooms/left?roomId=" + getRoomId()
				+ "&playerId=" + getAuthPlayer().id;
    var callback = onKickedFromRoom;

    if(isTokenSet()) // sessionHelper.js
        url += "&token=" + getToken();

    sendGetMethod(url, callback);
}

function kickOpponent()
{
	var url = "http://localhost:8000/api/rooms/left?roomId=" + getRoomId()
				+ "&playerId=" + getGameOpponent().id;
    var callback = onOpponentLeft;

    if(isTokenSet()) // sessionHelper.js
        url += "&token=" + getToken();

    sendGetMethod(url, callback);
}

function deleteRoom()
{
	var url = "http://localhost:8000/api/rooms/delete?roomId=" + getRoomId();
    var callback = onKickedFromRoom;

    if(isTokenSet()) // sessionHelper.js
        url += "&token=" + getToken();

    sendGetMethod(url, callback);
}

function onKickedFromRoom(data)
{
	unsetGameOpponent();
	checkReadyRequest = 0;
	window.location = "../Dashboard/dashboard.html";
}