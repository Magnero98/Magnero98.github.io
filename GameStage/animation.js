function startGameAnimationStart()
{
	$('#intermezzo-text').text('START !');
	$('#intermezzo').fadeToggle(3500);
}

function getGameWinnerAnimationStart()
{
	$('#intermezzo-text').text('Choosing The Winner');
	$('#intermezzo-icon').empty();
	$('#intermezzo-icon').append($('<span class="fas fa-spinner fa-pulse txt"></span>'));
	$('#intermezzo').fadeToggle(100);
}

function congratsTheWinnerAnimationStart(gameResult)
{
	$('#intermezzo-icon').empty();

	switch(gameResult)
	{
	case 1:
		$('#intermezzo-text').text('YAY! You Win :)');
		$('#intermezzo-icon').append($('<span class="far fa-thumbs-up txt"></span>'));
		break;
	case 0:
		$('#intermezzo-text').text('DRAW');
		break;
	case -1:
		$('#intermezzo-text').text('Oops! You Lose :\'(');
		$('#intermezzo-icon').append($('<span class="far fa-thumbs-down txt"></span>'));	
		break;
	}

	$('#intermezzo').fadeToggle(100);
	$('#intermezzo').fadeToggle(3500);
}

function endAnimation()
{
	$('#intermezzo').fadeToggle(100);
}