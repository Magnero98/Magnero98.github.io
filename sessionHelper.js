function getToken()
{
	return localStorage.getItem('token');
}

function getAuthPlayer()
{
	var player = JSON.parse(localStorage.getItem('authPlayer'));
	return player;
}

function setAuthPlayer(player)
{
	player = JSON.stringify(player);
	localStorage.setItem('authPlayer', player);
}

function getGameOpponent()
{
	var opponent = JSON.parse(localStorage.getItem('opponent'));
	return opponent;
}

function setGameOpponent(opponent)
{
	opponent = JSON.stringify(opponent);
	localStorage.setItem('opponent', opponent);
}

function unsetGameOpponent()
{
	localStorage.removeItem('opponent');
}


function getRoomId()
{
	return localStorage.getItem('roomId');
}

function setRoomId(roomId)
{
	localStorage.setItem('roomId', roomId);
}

function isTokenSet()
{
	return !(localStorage.getItem('token') === null);
}

function isAuthenticated()
{
	return !(localStorage.getItem('authenticated') === null);
}

function setToken(newToken)
{
	localStorage.setItem('token', newToken);	
}

function authenticate(newToken)
{
	localStorage.setItem('token', newToken);
	localStorage.setItem('authenticated', true);
}

function unauthenticate(newToken)
{
	localStorage.removeItem('authenticated');
}

function clearStorage()
{
	localStorage.clear();
}
