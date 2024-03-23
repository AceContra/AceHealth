const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    email:{required:true,type:String},

    language:{required:true,type:String,default:'en'},
    affectSettingLang:{required:true,type:Boolean,default:false},

    theme:{required:true,type:String,default:'default'},
});

module.exports = mongoose.model('Settings',settingsSchema);