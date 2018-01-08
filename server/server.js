require('./config/config');

const path = require('path');
const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const publicPath = path.join(__dirname, '../public');

var {mongoose} = require('./db/mongoose');

var app = express();
var server = http.createServer(app);
const port = process.env.PORT;

app.use(express.static(publicPath));
app.use(bodyParser.json());

require ('./routes')(app, mongoose);

app.listen(port, () => {
    console.log(`Started on port ${port}`)
});
