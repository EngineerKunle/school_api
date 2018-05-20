'use strict';
//working here for School api
//https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
module.exports = function(app, route, bodyParser, port) {
    let studentUrl = '/student';

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    route.use(((req, res, next) => {
        console.log('Time of request ', Date.now());
        next();
    }));

    route.get('/', (req, res) => {
        res.json({message : 'Welcome to the Class of 2018 API'});
    });

    app.use(studentUrl, route);

    app.listen(port, () =>{
        console.log('listening to http://localhost:' + port +studentUrl) ;
    });

}