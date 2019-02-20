var Shapes = Object.freeze({"NotSet":0, "Rock":1, "Paper":2, "Scissors":3});
var timer = setInterval(startTimeCounter, 1000);

var counter = 7;
var playerHasChooseShape = false;
var shapeIsSet = false;
var shape = Shapes.NotSet;


$(document).ready(function(){
    
	renderPlayerData();
	renderOpponentData();

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

$(window).on('beforeunload', function(){
    //if(!isRedirected)
        //unauthenticate(); // sessionHelper.js
});

function startTimeCounter()
{
	counter--;
	$("#timer").text(counter);
	console.log(counter);

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
		setTimeout(getTheGameWinner, 1000);
		return;
	}

	var url = "http://localhost:8000/api/games/winner?roomId=" + getRoomId()
				+ "&shape=" + shape;
    var callback = onGetTheGameWinner;

    if(isTokenSet()) // sessionHelper.js
        url += "&token=" + getToken();

    sendGetMethod(url, callback); // ajaxHelper.js
}

function onGetTheGameWinner(data)
{
	if('error' in data)
	{
		setTimeout(getTheGameWinner, 1000);
		return;
	}
	else
	{
		$.each(data['playersShape'], function(key, value){
	        if(value != getAuthPlayer().id) // sessionHelper.js
	        	renderOpponentShape(key);
	    });

		setTimeout(function(){
	    	if(data['winnerShape'] == Shapes.NotSet)
				alert('Draw');
			else if(data['winnerShape'] == shape)
				alert('You Win');
			else if(data['winnerShape'] != shape)
				alert('Opponent Win');
	    }, 1500);

		resetRoomReadyStatus();
	}
}

function resetRoomReadyStatus()
{
	var url = "http://localhost:8000/api/rooms/ready/reset?roomId=" + getRoomId();
    var callback = onResetRoomReadyStatus;

    if(isTokenSet()) // sessionHelper.js
        url += "&token=" + getToken();

    sendGetMethod(url, callback); // ajaxHelper.js
}

function onResetRoomReadyStatus(data)
{
	isRedirected = true;
	window.location = "../WaitingRoom/WaitingRoom.html";
}

function renderOpponentShape(shapeNumber)
{
	var opponentShapeImg = $("#opponentShape");

	if(shapeNumber == Shapes.Rock)
		opponentShapeImg.attr("src", "https://res.cloudinary.com/black-pearls/image/upload/v1550543098/RPS/Shapes/Rock.svg");
	else if(shapeNumber == Shapes.Paper)
		opponentShapeImg.attr("src", "https://res.cloudinary.com/black-pearls/image/upload/v1550543098/RPS/Shapes/Paper.svg");
	else if(shapeNumber == Shapes.Scissors)
		opponentShapeImg.attr("src", "https://res.cloudinary.com/black-pearls/image/upload/v1550543098/RPS/Shapes/Scissors.svg");
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
		playerShapeImg.attr("src", "https://res.cloudinary.com/black-pearls/image/upload/v1550543098/RPS/Shapes/Rock.svg");
	else if(shapeNumber == Shapes.Paper)
		playerShapeImg.attr("src", "https://res.cloudinary.com/black-pearls/image/upload/v1550543098/RPS/Shapes/Paper.svg");
	else if(shapeNumber == Shapes.Scissors)
		playerShapeImg.attr("src", "https://res.cloudinary.com/black-pearls/image/upload/v1550543098/RPS/Shapes/Scissors.svg");
}

function setPlayerShape()
{
	var url = "http://localhost:8000/api/games/set/shape?roomId=" + getRoomId()
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
