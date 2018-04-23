loginStatus = () => {
    FB.login(function (response) {
        // handle the response
        // FB.getLoginStatus((response) => {
        statusChangeCallback(response);
        // })
    }, { scope: 'public_profile,email,user_posts,user_likes,user_birthday' });
}