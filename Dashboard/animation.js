function createRoomAnimationStart()
{
	$('#intermezzo-text').text('Creating Room...');
	$('#intermezzo-icon').empty();
	$('#intermezzo-icon').append($('<span class="fas fa-spinner fa-pulse txt"></span>'));
	$('#intermezzo').fadeIn(100);
	setTimeout(joinRoomAnimationStart, 1000);
}

function joinRoomAnimationStart()
{
	$('#intermezzo-text').text('Joining Room...');
	$('#intermezzo-icon').empty();
	$('#intermezzo-icon').append($('<span class="fas fa-spinner fa-pulse txt"></span>'));
	$('#intermezzo').fadeIn(100);
}