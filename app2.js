const express = require('express');
const https = require('https');
const config = require('./config.json');
const fs = require('fs');
const bodyParser = require('body-parser');
const FB = require('fb');
const mongoose = require('mongoose');
const postRouter = require('./router/posts/postRouter.js');
const userRouter = require('./router/users/userRouter.js');

const app = express();
// create application/json parser
var jsonParser = bodyParser.json();
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

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
	res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/'));

const port = process.env.PORT || config.port;

// app.listen(port, () => {
//     console.log("Your server is online at " + port);
// });
https.createServer({
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
}, app)
	.listen(port, function () {
		console.log('Example app listening on port 8000! Go to https://localhost:8000/');
	})