var Shapes = Object.freeze({"NotSet":0, "Rock":1, "Paper":2, "Scissors":3});
var timer = setInterval(startTimeCounter, 1000);

var counter = 11;
var playerHasChooseShape = false;
var shapeIsSet = false;
var shape = Shapes.NotSet;


$(document).ready(function(){
    
	renderPlayerData();
	renderOpponentData();
	startGameAnimationStart();

    $("#btnPaper").click(function(){
        chooseShape(Shapes.Paper);
    });

    $("#btnScissors").click(function(){
       chooseShape(Shapes.Scissors); 
    });

    $("#btnRock").click(function(){
        chooseShape(Shapes.Rock);
    });

});

function startTimeCounter()
{
	counter--;
	$("#timer").text(counter);

	if(counter == 0)
	{
		$("#timer").text("Time Out");
		
		if(!shapeIsSet)
		 	chooseShape(Math.floor(Math.random() * 2) + 1);
		else
			getTheGameWinner();

		clearInterval(timer);
		return;
	}
}

function getTheGameWinner()
{
	if(playerHasChooseShape && !shapeIsSet)
	{
		getTheGameWinner();
		return;
	}

	getGameWinnerAnimationStart();

	var url = "https://rps-online.000webhostapp.com/api/games/winner?roomId=" + getRoomId()
				+ "&shape=" + shape;
    var callback = onGetTheGameWinner;

    if(isTokenSet()) // sessionHelper.js
        url += "&token=" + getToken();

    setTimeout(function(){
    	sendGetMethod(url, callback); // ajaxHelper.js
    }, 1500);
}

function onGetTheGameWinner(data)
{
	endAnimation();
	if('error' in data)
	{
		setTimeout(getTheGameWinner, 1000);
		return;
	}
	else
	{
		if(Object.keys(data['playersShape']).length  == 1)
		{
			$.each(data['playersShape'], function(key, value){
	        	renderOpponentShape(key, data);
		    });
		}
		else
		{
			$.each(data['playersShape'], function(key, value){
		        if(value != getAuthPlayer().id) // sessionHelper.js
		        	renderOpponentShape(key, data);
		    });
		}
		

		setTimeout(resetRoomReadyStatus, 3500);
	}
}

function congratulatePlayer(data)
{
	if(data['winnerShape'] == Shapes.NotSet)
	{
		congratsTheWinnerAnimationStart(0);
		var player = getAuthPlayer();
		var currPoints = parseInt(player.points)
		currPoints -= 10;
		player.points = currPoints;
		setAuthPlayer(player);
	}
	else if(data['winnerShape'] == shape)
	{
		congratsTheWinnerAnimationStart(1);
		var player = getAuthPlayer();
		var currPoints = parseInt(player.points)
		currPoints += 10;
		player.points = currPoints;
		setAuthPlayer(player);
	}
	else if(data['winnerShape'] != shape)
	{
		congratsTheWinnerAnimationStart(-1);
		var player = getAuthPlayer();
		var currPoints = parseInt(player.points)
		currPoints -= 10;
		player.points = currPoints;
		setAuthPlayer(player);
	}
}

function resetRoomReadyStatus()
{
	var url = "https://rps-online.000webhostapp.com/api/rooms/ready/reset?roomId=" + getRoomId();
    var callback = onResetRoomReadyStatus;

    if(isTokenSet()) // sessionHelper.js
        url += "&token=" + getToken();

    sendGetMethod(url, callback); // ajaxHelper.js
}

function onResetRoomReadyStatus(data)
{
	window.location = "../WaitingRoom/waitingRoom.html";
}

function renderOpponentShape(shapeNumber, data)
{
	var opponentShapeImg = $("#opponentShape");

	if(shapeNumber == Shapes.Rock)
		opponentShapeImg.attr("src", "https://res.cloudinary.com/black-pearls/image/upload/v1550737819/RPS/Shapes/RealRock.svg");
	else if(shapeNumber == Shapes.Paper)
		opponentShapeImg.attr("src", "https://res.cloudinary.com/black-pearls/image/upload/v1550737819/RPS/Shapes/RealPaper.svg");
	else if(shapeNumber == Shapes.Scissors)
		opponentShapeImg.attr("src", "https://res.cloudinary.com/black-pearls/image/upload/v1550737819/RPS/Shapes/RealScissors.svg");

	//setTimeout(function(){
	    congratulatePlayer(data);
    //}, 1000);

}

function chooseShape(shapeNumber)
{
	shape = shapeNumber;
	playerHasChooseShape = true;
	shapeIsSet = false;
	renderPlayerShape(shapeNumber);
	setPlayerShape();
}

function renderPlayerShape(shapeNumber)
{
	var playerShapeImg = $("#playerShape");

	if(shapeNumber == Shapes.Rock)
		playerShapeImg.attr("src", "https://res.cloudinary.com/black-pearls/image/upload/v1550737819/RPS/Shapes/RealRock.svg");
	else if(shapeNumber == Shapes.Paper)
		playerShapeImg.attr("src", "https://res.cloudinary.com/black-pearls/image/upload/v1550737819/RPS/Shapes/RealPaper.svg");
	else if(shapeNumber == Shapes.Scissors)
		playerShapeImg.attr("src", "https://res.cloudinary.com/black-pearls/image/upload/v1550737819/RPS/Shapes/RealScissors.svg");
}

function setPlayerShape()
{
	var url = "https://rps-online.000webhostapp.com/api/games/set/shape?roomId=" + getRoomId()
				+ "&shape=" + shape;
    var callback = onSetPlayerShape;

    if(isTokenSet()) // sessionHelper.js
        url += "&token=" + getToken();

    sendGetMethod(url, callback); // ajaxHelper.js
}

function onSetPlayerShape()
{
	shapeIsSet = true;
	if(counter == 0)
		getTheGameWinner();
}

function renderPlayerData()
{
    $('#playerName1').text(getAuthPlayer().username); // include '../sessionHelper.js' 
    $('#playerName2').text(getAuthPlayer().username); // include '../sessionHelper.js' 
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

function renderOpponentData()
{
	$('#opponentName').text(getGameOpponent().username);

	if(getGameOpponent().gender == "Male")
		$('#opponentImg').attr('src', 'https://res.cloudinary.com/black-pearls/image/upload/v1550398551/RPS/Players/boy.svg');
	else
		$('#opponentImg').attr('src', 'https://res.cloudinary.com/black-pearls/image/upload/v1550398551/RPS/Players/girl.svg');
}
