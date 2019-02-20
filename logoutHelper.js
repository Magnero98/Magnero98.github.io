function logout()
{
    var url = "http://localhost:8000/api/logout";
    var callback = onLogout;

    if(isTokenSet()) // sessionHelper.js
        url += "?token=" + getToken(); // sessionHelper.js

    sendGetMethod(url, callback); // ajaxHelper.js
}

function onLogout(data)
{
    if(!('error' in data))
    {
        clearStorage(); // sessionHelper.js
        window.location = "../Login/login.html";
    }
    else
    {
        alert(data.error);
    }
}