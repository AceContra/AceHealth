const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patient:{
        name:{required:true,type:String},
        email:{required:true,type:String},
        picture:{required:true,type:String},
    },
});

module.exports = mongoose.model('Ride',patientSchema);