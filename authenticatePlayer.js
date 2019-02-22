/* include 'sessionHelper.js'  */
/* include 'logoutHelper.js'  */

function redirectIfAuthenticated()
{
    if(!isTokenSet()) // sessionHelper.js
        window.location = "../Login/login.html";
}

redirectIfAuthenticated();