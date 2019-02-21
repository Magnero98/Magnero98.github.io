/* include 'sessionHelper.js'  */
/* include 'logoutHelper.js'  */

function redirectIfAuthenticated()
{
    if(!isTokenSet()) // sessionHelper.js
        logout();
}

var isRedirected = false;

redirectIfAuthenticated();