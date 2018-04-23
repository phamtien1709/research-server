loginStatus = () => {
    FB.getLoginStatus((response) => {
        statusChangeCallback(response);
    })
}