const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PostsSchema = new Schema({
    id: {
        type: String,
        require: true,
    },
    url: {
        type: String,
        require: true
    },
    url_pic: {
        type: String
    },
    like_count: {
        type: Number,
        require: true
    },
    comment_count: {
        type: Number,
    },
    share_count: {
        type: Number,
    },
    owned_id: {
        type: String,
        require: true
    },
    follow_id: {
        type: String
    }
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('posts', PostsSchema);