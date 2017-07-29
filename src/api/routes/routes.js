'use strict';
module.exports = function(app, exampleRoute) {

    app.route('/student')
    .get(function(req, res, next) {
       res.json({notes: "This is your notebook. Edit this to start saving your notes!"})
    })
    .post((req, res) => {
        var user_id = req.body.id;
        var token = req.body.token;
        var geo = req.body.geo;
        res.send(user_id + ' ' + token + ' ' + geo);
        console.log("user id is" + user_id + "\n" + "token for user " + token + "\n" + "geo is " + geo);
    });

    exampleRoute.get('/new' ,function(req, res, next) {
        res.json({notes: "we in our used method"});
        console.log("we outputting this " + req.method, "the requested url is this: " + req.url);
        next();
    });

    exampleRoute.get('/events', function(req, res, next) {
        res.json({notes: "we in our used method inside events http"})
    });

    app.use('/extend', exampleRoute);
}