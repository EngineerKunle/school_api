const express = require('express');
const app     = express();

var port      = 3000;

app.get('/', function(req, res){
    res.send('Hello world')
});

app.listen(port, function(){
    console.log('listening to port: ' + port);
});