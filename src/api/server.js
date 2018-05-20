const express       = require('express'),
app                 = express(),
bodyParser          = require('body-parser');

var routes          = require('./routes/routes'),
studentRoutes       = require('./routes/studentRoutes'),
expressRoutes       = require('express').Router(),
exampleRoute        = require('express').Router(),
port                = 3000;

studentRoutes(app, expressRoutes, bodyParser, port)

// routes(app, exampleRoute);