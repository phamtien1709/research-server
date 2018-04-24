const config = require('../../config.json');
const FB = require('fb');
const postsModel = require('./postsSchema');

FB.setAccessToken(config.access_token);
const getPostsOfPage = (pageId, callback) => {
    var timeEnd = new Date().getTime();
    var timeStart = timeEnd - 2 * 86400000;
    FB.api(pageId + '/posts?fields=permalink_url,created_time,full_picture,id,message,shares,likes.summary(true),comments.summary(true)&limit=10', (result) => {
        if (!result || result.error) {
            callback(result.error);
        } else {
            var callerPost = result;
            var data = [];
            // console.log(result.data[0].comments.summary.total_count);
            FB.api(`/${pageId}`, 'GET', {}, (response) => {
                // console.log(response);
                var namePage = response.name;
                FB.api(`/${pageId}?fields=picture`, 'GET', {}, (response) => {
                    console.log(response);
                    var picturePage = response.picture;
                    for (res in callerPost.data) {
                        let idUserPost = callerPost.data[res].id.slice(0, 15);
                        let idPost = callerPost.data[res].id.slice(-16);
                        let like_count;
                        let share_count;
                        let comment_count;
                        if (callerPost.data[res].likes !== undefined) {
                            if (callerPost.data[res].likes.summary !== undefined) {
                                like_count = callerPost.data[res].likes.summary.total_count;
                            } else {
                                like_count = 0;
                            }
                        } else {
                            like_count = 0;
                        }
                        if (callerPost.data[res].shares !== undefined) {
                            share_count = callerPost.data[res].shares.count;
                        } else {
                            share_count = 0;
                        }
                        if (callerPost.data[res].comments !== undefined) {
                            if (callerPost.data[res].comments.summary !== undefined) {
                                comment_count = callerPost.data[res].comments.summary.total_count;
                            } else {
                                comment_count = 0;
                            }
                        } else {
                            comment_count = 0;
                        }
                        // console.log(result.data[0]);
                        data.push({
                            "url": callerPost.data[res].permalink_url,
                            "idUserPost": idUserPost,
                            "idPost": idPost,
                            "full_picture": callerPost.data[res].full_picture,
                            "message": callerPost.data[res].message,
                            "created_time": callerPost.data[res].created_time,
                            "like_count": like_count,
                            "share_count": share_count,
                            "comment_count": comment_count,
                            "namePage": namePage,
                            "picturePage": picturePage.data.url
                        });
                        // console.log(result.data[res]);
                    }
                    // console.log(result.data[0]);
                    callback(data);
                });
            });
        }
    })
}
const addPost = (post, callback) => {
    let newPost = new postsModel({
        id: post.id,
        url: post.url,
        url_pic: post.full_picture,
        like_count: post.like_count,
        comment_count: post.comment_count,
        share_count: post.comment_count,
        owned_id: 'beatvn.page',
        follow_id: 'None'
    });
    newPost.save((err, data) => {
        if (err) callback(err);
        else callback(data);
    })
}
module.exports = {
    getPostsOfPage,
    addPost
}

// FB.api(pageId + '/posts?fields=permalink_url,full_picture,id,message,shares,likes.summary(true),comments.summary(true)&limit=10&since=' + parseInt(timeStart / 1000) + '&until=' + parseInt(timeEnd / 1000)