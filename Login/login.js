/* include '../sessionHelper.js' */
/* include '../ajaxHelper.js' */

$(document).ready(function(){

    redirectIfLoggedIn();

    $("#loginForm").on("submit", function(e){
        e.preventDefault();
        login();
    }); 

});

function login()
{
    var url = "http://localhost:8000/api/login";
    var data = $('#loginForm').serialize();
    var callback = onLogin;

    if(isTokenSet()) // sessionHelper.js
        url += "?token=" + getToken(); // sessionHelper.js

    sendPostMethod(url, data, callback); // ajaxHelper.js
}

function onLogin(data)
{
    if(!("error" in data))
    {
        //alert(JSON.stringify(data['player']));
        authenticate(data['token']); // sessionHelper.js
        window.location = "../Dashboard/dashboard.html";    
    }
    else
    {
        setToken(data['token']); // sessionHelper.js
        alert(JSON.stringify(data['error']));
    }
}

function redirectIfLoggedIn()
{
    if(isAuthenticated()) // sessionHelper.js
        window.location = "../Dashboard/dashboard.html";       
}

//clearStorage();