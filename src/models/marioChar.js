const mongoose = require('mongoose');

//  Your code goes here

const marioSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    weight:{
        type: String,
        required: true
    }
})

const marioModel = mongoose.model('mariochar', marioSchema);


module.exports = marioModel;