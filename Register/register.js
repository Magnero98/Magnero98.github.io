/* include '../sessionHelper.js' */
/* include '../ajaxHelper.js' */

$(document).ready(function(){

    redirectIfLoggedIn();

    $("#registerForm").on("submit", function(e){

        e.preventDefault();
        if(!validateData()) return;

        register();
    }); 

});

function register()
{
    var url = "http://localhost:8000/api/register";
    var data = $('#registerForm').serialize();
    var callback = onRegister;

    if(isTokenSet()) // sessionHelper.js
        url += "?token=" + getToken(); // sessionHelper.js

    sendPostMethod(url, data, callback); // ajaxHelper.js
}

function onRegister(data)
{
    if(!("error" in data))
    {
        authenticate(data['token']); // sessionHelper.js
        window.location = "../Dashboard/dashboard.html";    
    }
    else
    {
        setToken(data['token']); // sessionHelper.js
        alert(data['error']);
    }
}

function validateData()
{
    var data = $('#registerForm').serializeArray();

    var username = $.trim(data[0]
                            .value
                            .replace(/[^a-zA-Z]/g,''));
    if(username.length < 6)
    {
        alert('username must contains only alphabets or more than 5 characters');
        return false;
    }

    var password = $.trim(data[1].value);
    if(password.length < 6)
    {
        alert('password must be more than 5 characters');
        return false;
    }

    return true;
}

function redirectIfLoggedIn()
{
    if(isAuthenticated()) // sessionHelper.js
        window.location = "../Dashboard/dashboard.html";       
}