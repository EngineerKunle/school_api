const express       = require('express'),
app                 = express(),
bodyParser          = require('body-parser');

var routes          = require('./routes/routes'),
exampleRoute        = require('express').Router(),
port                = 3000;

// app.get('/', function(req, res){
//     res.send('Hello world')
// });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app, exampleRoute);

app.listen(port, function(){
    console.log('listening to http://localhost:' + port);
});