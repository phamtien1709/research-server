// import { reject } from 'any-promise';

const config = require('../../config.json');
const FB = require('fb');
const postsModel = require('./postsSchema');

FB.setAccessToken(config.access_token);
const getPostsOfPage = (callback) => {
    var timeEnd = new Date().getTime();
    var timeStart = timeEnd - 2 * 86400000;
    FB.api(config.pageId + '/posts?fields=permalink_url,full_picture,id,message,shares,likes.summary(true),comments.summary(true)&limit=10&since=' + parseInt(timeStart / 1000) + '&until=' + parseInt(timeEnd / 1000), (result) => {
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
                // console.log(result.data[res]);
            }
            // console.log(result.data[0]);
            callback(data);
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
        if(err) callback(err);
        else callback(data);
     })
}
module.exports = {
    getPostsOfPage,
    addPost
}