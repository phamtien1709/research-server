const express = require('express');
const Router = express.Router();
const config = require('../../config.json');
const postsController = require('./postsController.js');

Router.get('/', (req, res) => {
    postsController.getPostsOfPage(config.pageId, (result) => {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.send(result);
        // for(res in result){
        //     postsController.addPost(result[res], (caller)=>{
        //         console.log(`It's up`);
        //     });
        // }
        // res.send(`${result.message}`);
    })
});
Router.get('/duong', (req, res) =>{
    let pageId = config.duong;
    // console.log(req.body);
    postsController.getPostsOfPage(pageId, (result) => {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.send(result);
        // for(res in result){
        //     postsController.addPost(result[res], (caller)=>{
        //         console.log(`It's up`);
        //     });
        // }
        // res.send(`${result.message}`);
    })
});
Router.get('/tien', (req, res) =>{
    let pageId = config.tien;
    // console.log(req.body);
    postsController.getPostsOfPage(pageId, (result) => {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.send(result);
        // for(res in result){
        //     postsController.addPost(result[res], (caller)=>{
        //         console.log(`It's up`);
        //     });
        // }
        // res.send(`${result.message}`);
    })
});
Router.get('/khai', (req, res) =>{
    let pageId = config.khai;
    // console.log(req.body);
    postsController.getPostsOfPage(pageId, (result) => {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.send(result);
        // for(res in result){
        //     postsController.addPost(result[res], (caller)=>{
        //         console.log(`It's up`);
        //     });
        // }
        // res.send(`${result.message}`);
    })
});
Router.get('/getAnother', (req, res) =>{
    // console.log(req.query.raw_url);
    var cutString = req.query.raw_url.split("/");
    // console.log(cutString);
    let pageId;
    if(cutString[cutString.length-1] === ""){
        // console.log('ohh');
        pageId = cutString[cutString.length-2]; 
    } else {
        // console.log('afsad');
        pageId = cutString[cutString.length-1];
    }
    // console.log(cutString[cutString.length-1]);
    // console.log(cutString[cutString.length-2]);
    // let pageId = config.khai;
    // // console.log(req.body);
    // console.log(pageId);
    postsController.getPostsOfPage(pageId, (result) => {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.send(result);
        // for(res in result){
        //     postsController.addPost(result[res], (caller)=>{
        //         console.log(`It's up`);
        //     });
        // }
        // res.send(`${result.message}`);
    })
});


module.exports = Router;