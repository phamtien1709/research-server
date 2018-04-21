const config = require('../../config.json');
const FB = require('fb');

FB.setAccessToken(config.access_token);
const getPostsOfPage = (callback) => {
    var timeEnd = new Date().getTime();
    var timeStart = timeEnd - 2 * 86400000;
    FB.api(config.pageId + '/posts?fields=permalink_url,shares,likes.summary(true),comments.summary(true)&limit=50&since=' + parseInt(timeStart / 1000) + '&until=' + parseInt(timeEnd / 1000), (result) => {
        if (!result || result.error) {
            callback(result.error);
        } else {
            // console.log(result.data);
            var data = [];
            for (res in result.data) {
                data.push({
                    "url": result.data[res].permalink_url,
                    "id": result.data[res].id})
            }
            callback(data);
        }
    });
}
module.exports = {
    getPostsOfPage
}