const mongoose  = require('mongoose'),
      database  = 'mongodb://127.0.0.1:27017',
      Schema    = mongoose.Schema;

var StudentSchema = new Schema({
    name    : String, 
    surname : String,
    id      : Number 
});

mongoose.connect(database);

module.exports = mongoose.model('Student', StudentSchema);
