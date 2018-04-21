const express = require('express');
const Router = express.Router();
const config = require('../../config.json');
const postsController = require('./postsController.js');

Router.get('/', (req, res) => {
    postsController.getPostsOfPage((result) => {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.send(result);
    })
})

module.exports = Router;