const express = require('express');
const config = require('./config.json');
const FB = require('fb');
const postRouter = require('./router/posts/postRouter.js');

const app = express();

app.use('/post', postRouter);


app.get('/', (req, res) => {
    res.send('Nothing');
});

const port = process.env.PORT || config.port;

app.listen(port, () => {
    console.log("Your server is online at " + port);
});