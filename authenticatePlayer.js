/* include 'sessionHelper.js'  */
/* include 'logoutHelper.js'  */

function redirectIfAuthenticated()
{
    // var url = "http://localhost:8000/api/authenticate";
    // var callback = onAuthenticated; 

    // if(isTokenSet()) // sessionHelper.js
    //     url += "?token=" + getToken();

    if(!isAuthenticated() || !isTokenSet()) // sessionHelper.js
        logout();

            //sendGetMethod(url, callback);
}

function onAuthenticated(data)
{
	if(('error' in data))
		window.location = "../Login/login.html";
}

var isRedirected = false;

redirectIfAuthenticated();