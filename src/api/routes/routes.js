'use strict';
module.exports = function(app, exampleRoute) {

    app.route('/playground')
    .get(function(req, res, next) {
       res.json({notes: "This is your notebook. Edit this to start saving your notes!"})
    })
    .post((req, res) => {
        let user_id = req.body.id;
        let token = req.body.token;
        let geo = req.body.geo;
        let debugPassword = req.body.password;

        res.send(user_id + ' ' + token + ' ' + geo + '' + debugPassword);
        console.log("user id is " + user_id + "\n" + "token for user " + token + "\n" + "geo is " + geo + "\n" 
        + "this is the user password " + debugPassword);
    
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

    //Main applications for students as above code just use as a playground

    app.get('/', (req, res) => {
        res.json({"message": "Ready to start API"});
    });

    app.route('/student')
    .get((req, res, next) => {
        res.json({
            firstName : "Kunle Ogunjimi"
        })
    });
}