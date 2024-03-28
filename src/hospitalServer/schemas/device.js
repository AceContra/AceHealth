const mongoose = require('mongoose');
// const Any = new mongoose.Schema({ any: {} });

const deviceSchema = new mongoose.Schema({
    id:{required:true,type:String},
    name:{required:true,type:String},
    icon:{required:true,type:String},
    type:{required:true,type:String},
    assignedTo:{required:true,type:String},
    isActive:{required:true,type:Boolean},
    alert:{required:true,type:Boolean}
});

module.exports = mongoose.model('Device',deviceSchema);