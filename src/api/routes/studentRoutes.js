'use strict';
//working here for School api
//https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
const Student = require('../model/student')
module.exports = function(app, router, bodyParser, port) {
    let studentUrl = '/school';

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    router.use(((req, res, next) => {
        console.log('Time of request ', Date.now());
        next();
    }));

    router.get('/', (req, res) => {
        res.json({message : 'Welcome to the Class of 2018 API'});
    });

    router.route('/students')
    .post((req, res) => {
        var student    = new Student();
        student.name    = req.body.name;
        student.surname = req.body.surname;
        student.id      = req.body.id;
        student.age     = req.body.age;

        // save the bear and check for errors
        student.save((err) => {
            if (err)
                res.send(err);

            res.json({ message: 'Student created!' });
        });

    })
    .get((req, res)=> {
        Student.find((err, students) =>{
            if (err)
                res.send(err);

            res.json(students);
        });
    });

    app.use(studentUrl, router);

    app.listen(port, () =>{
        console.log('listening to http://localhost:' + port +studentUrl) ;
    });

}