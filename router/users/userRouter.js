const express = require('express');
const Router = express.Router();
const config = require('../../config.json');
// const postsController = require('./userController.js');

Router.get('/', (req, res) => {
    console.log('user direct');
})

module.exports = Router;