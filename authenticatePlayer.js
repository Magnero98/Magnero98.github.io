/* include 'sessionHelper.js'  */
/* include 'logoutHelper.js'  */

function redirectIfAuthenticated()
{
    if(!isTokenSet()) // sessionHelper.js
    {
        logout();
        window.location = "../Login/login.html";
    }
}

var isRedirected = false;

redirectIfAuthenticated();