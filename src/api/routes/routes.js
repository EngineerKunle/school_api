'use strict';
module.exports = function(app, exampleRoute) {

    app.route("/student").get(function(req, res, next) {
       res.json({notes: "This is your notebook. Edit this to start saving your notes!"})
    })

    exampleRoute.get("/new" ,function(req, res, next) {
        res.json({notes: "we in our used method"});
        console.log("we outputting this " + req.method, "the requested url is this: " + req.url);
        next();
    });

    exampleRoute.get('/events', function(req, res, next) {
        res.json({notes: "we in our used method inside events http"})
    });

    app.use('/extend', exampleRoute);
}