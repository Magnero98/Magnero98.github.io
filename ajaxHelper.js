function sendPostMethod(redirectUrl, data, callback)
{
    $.ajax({
        type:  "POST",
        url:   redirectUrl,
        data:  data,
        dataType: "json",
        success: function(data){
            callback(data);
        },
        error: function(errMsg) {
            alert(JSON.stringify(errMsg));
        }
    });
}

function sendGetMethod(redirectUrl, callback)
{
    $.ajax({
        type:  "GET",
        url:   redirectUrl,
        dataType: "json",
        success: function(data){
            callback(data);
        },
        error: function(errMsg) {
            alert(JSON.stringify(errMsg));
        }
    });
}