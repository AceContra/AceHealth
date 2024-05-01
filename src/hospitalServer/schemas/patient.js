const mongoose = require('mongoose');
// const Any = new mongoose.Schema({ any: {} });

const patientSchema = new mongoose.Schema({

    id:{required:true,type:String},
    name:{required:true,type:String},
    picture:{required:true,type:String},
    age:{required:true,type:String},
    bloodgroup:{required:true,type:String},
    deviceid:{required:true,type:String},
    category:{required:true,type:String},
    address:{required:true,type:String},
    phone:{required:true,type:String},
    height:{required:true,type:Number},
    bloodPressure:{required:true,type:Number},
    heartRate:{required:true,type:Number},
    glucoseRate:{required:true,type:Array},
    bmpResult:{required:true,type:Number}
});

module.exports = mongoose.model('Patient',patientSchema);