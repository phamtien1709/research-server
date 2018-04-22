const express = require('express');
const config = require('./config.json');
const FB = require('fb');
const mongoose = require('mongoose');
const postRouter = require('./router/posts/postRouter.js');
const userRouter = require('./router/users/userRouter.js');

const app = express();
mongoose.connect(config.connectionDatabase, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('connect success');
	}
});

app.use('/post', postRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send('Nothing');
});

const port = process.env.PORT || config.port;

app.listen(port, () => {
    console.log("Your server is online at " + port);
});