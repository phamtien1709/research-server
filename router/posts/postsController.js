const config = require('../../config.json');
const FB = require('fb');

FB.setAccessToken(config.access_token);
const getPostsOfPage = (callback) => {
    var timeEnd = new Date().getTime();
    var timeStart = timeEnd - 2 * 86400000;
    FB.api(config.pageId + '/posts?fields=permalink_url,full_picture,id,message,shares,likes.summary(true),comments.summary(true)&since=' + parseInt(timeStart / 1000) + '&until=' + parseInt(timeEnd / 1000), (result) => {
        if (!result || result.error) {
            callback(result.error);
        } else {
            // console.log(result.data[0].comments.summary.total_count);
            var data = [];
            for (res in result.data) {
                data.push({
                    "url": result.data[res].permalink_url,
                    "id": result.data[res].id,
                    "full_picture": result.data[res].full_picture,
                    "message": result.data[res].message,
                    "like_count": result.data[0].likes.summary.total_count,
                    "share_count": result.data[0].shares.count,
                    "comment_count": result.data[0].comments.summary.total_count
                })
            }
            // console.log(result.data[0]);
            callback(data);
        }
    })
}
module.exports = {
    getPostsOfPage
}