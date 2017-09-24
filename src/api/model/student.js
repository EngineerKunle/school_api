const mongoose = require('mongoose'), 
      Schema   = mongoose.Schema;

var StudentSchema = new Schema({
    name    : String, 
    surname : String,
    id      : Number 
});

module.exports = mongoose.model('Student', StudentSchema);
