require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

require ('./routes')(app, mongoose);

app.listen(port, () => {
    console.log(`Started on port ${port}`)
});
