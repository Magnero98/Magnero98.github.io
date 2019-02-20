/* include '../sessionHelper.js' */
/* include '../ajaxHelper.js' */
/* include '../authenticatePlayer.js' */

$(document).ready(function(){
    
    getPlayerData();
    getRoomList();
    
    $("#logoutBtn").click(function(){
        logout();
    });

    $("#syncBtn").click(function(){
        getRoomList();
    }); 

    $("#createRoomForm").on("submit", function(e){
        e.preventDefault();
        createNewRoom();
    }); 

});

$(window).on('beforeunload', function(){
    if(!isRedirected)
        unauthenticate(); // sessionHelper.js
});

function getRoomList()
{
    $('.fa-sync-alt').toggleClass("fa-pulse");

    var url = "http://localhost:8000/api/rooms";
    var callback = onGetRoomList;

    if(isTokenSet()) // sessionHelper.js
        url += "?token=" + getToken();

    sendGetMethod(url, callback); // ajaxHelper.js
}

function onGetRoomList(data)
{
    var roomListScrollBox = $('#roomList');
    roomListScrollBox.empty();
    var rooms = data['rooms'];

    $.each(rooms, function(key, value){
        var elm = '<li class="list-group-item">' +
                        '<label class="subtitle txt-inverse">' + value.title + '</label>' +
                        '<div class="body pull-right">' +
                            '<span class="pin">' + Object.keys(value.players).length + '/2</span>';

                        if(Object.keys(value.players).length < 2)
                            elm += '<button class="btn btn-xs btn-success" onclick="joinRoom(\'' + key + '\')">Join</button>';
                        else
                            elm +='<button class="btn btn-xs btn-warning">Full</button>';

        elm +=          '</div>' +
                '</li>';

        roomListScrollBox.append($(elm));
    });

    $('.fa-sync-alt').toggleClass("fa-pulse");
}

function createNewRoom()
{
    var url = "http://localhost:8000/api/rooms/create";
    var data = $('#createRoomForm').serialize();
    var callback = onCreateRoom;

    if(isTokenSet()) // sessionHelper.js
        url += "?token=" + getToken(); // sessionHelper.js

    sendPostMethod(url, data, callback); // ajaxHelper.js
}

function onCreateRoom(data)
{
    setRoomId(data['roomId']); // sessionHelper.js
    joinRoom(data['roomId'], true);
    getRoomList();
}

function joinRoom(roomId, firstJoin)
{
    if(!firstJoin)
        setRoomId(roomId); // sessionHelper.js

    var url = "http://localhost:8000/api/rooms/join?roomId=" + roomId;
    var callback = onJoinRoom;

    if(isTokenSet()) // sessionHelper.js
        url += "&token=" + getToken(); // sessionHelper.js

    sendGetMethod(url, callback); // ajaxHelper.js
}

function onJoinRoom()
{
    isRedirected = true;
    window.location = "../WaitingRoom/waitingRoom.html";
}

function getPlayerData()
{
    if(getAuthPlayer() != null) return;
    
    var url = "http://localhost:8000/api/player";
    var callback = renderPlayerData; // sessionHelper.js

    if(isTokenSet()) // sessionHelper.js
        url += "?token=" + getToken();

    sendGetMethod(url, callback); // ajaxHelper.js
}


function renderPlayerData(data)
{
    setAuthPlayer(data);

    $('#playerName').text(data.username); // include '../sessionHelper.js' 
    $('#playerPoints').text(data.points); // include '../sessionHelper.js'

    if(data.gender == "Male") // include '../sessionHelper.js'
        $('#playerImg').attr('src', 'https://res.cloudinary.com/black-pearls/image/upload/v1550398551/RPS/Players/boy.svg');
    else
        $('#playerImg').attr('src', 'https://res.cloudinary.com/black-pearls/image/upload/v1550398551/RPS/Players/girl.svg');      
}