'use strict';
//working here for School api
//https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
//https://coursework.vschool.io/mongoose-crud/
const Student = require('../model/student')
module.exports = function(app, router, bodyParser, port) {
    let studentUrl    = '/school',
        routeUrl      = '/students',
        singleStudent = '/students/:id',
        deleteUrl     = '/delete/:id';

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    router.use(((req, res, next) => {
        console.log('Time of request ', Date.now());
        next();
    }));

    router.get('/', (req, res) => {
        res.json({message : 'Welcome to the Class of 2018 API'});
    });

    router.route(routeUrl)
    .post((req, res) => {
        res.set('Content-Type', 'application/json')
        createNewStudent(req, res);
    })
    .get((req, res)=> {
        Student.find((err, students) =>{
            if (err)
                res.send(err);

            res.json(students);
        });
    });

    router.route(singleStudent)
    .get(((req, res) => {
        Student.findById({_id : req.params.id}, (err, student) => {
            if(err) 
                res.json(err);
            res.json(student);   
        })
    }))
    .put((req, res) => {
        Student.findById({_id : req.params.id}, (err, student) => {
            student.name = req.body.name;

            student.save((err) => {
                if (err)
                    res.send(err);
                res.status(201).send(student);
            });
        })
    });

    router.route(deleteUrl)
    .delete(((req, res) => {
        Student.findByIdAndRemove({_id : req.params.id}, (err, student) =>{
             if (err) 
                 res.status(500).send({message: err});

             const response = {
                message: "Student successfully deleted"
            };

            res.status(200).send(response);
        })
    }));

    app.use(studentUrl, router);

    app.listen(port, () =>{
        console.log('listening to http://localhost:' + port +studentUrl) ;
    });

    // Creates new Students
    function createNewStudent(req, res) {
        var student    = new Student();
        student.name    = req.body.name;
        student.surname = req.body.surname;
        student.id      = req.body.id;
        student.age     = req.body.age;

        student.save((err) => {
            if (err)
                res.send(err);
            res.status(201).send({message: 'Student created!'});
        });
    }
}