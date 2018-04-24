loginStatus = () => {
    FB.login(function (response) {
        // handle the response
        // FB.getLoginStatus((response) => {
        statusChangeCallback(response);
        // })
    }, { scope: 'public_profile,email,user_posts,user_likes,user_birthday' });
}
getPostDemo = () => {
    $.ajax({
        type: 'GET',
        url:'../post/getAnother',
        dataType: 'json',
        data: {
            'raw_url': "https://www.facebook.com/yesclubneu/"
        },
        success: (response)=>{
            console.log(response);
        }
    })
}