const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require('cors');
require('./utils/database');

const clr = require('./utils/color');
const logger = require('./utils/logger');

const patientSchema = require('./schemas/patient');
const deviceSchema = require('./schemas/device');
const settingsSchema = require('./schemas/settings');


if(process.argv.includes('--env-file=.env',2) || process.argv.includes('--env-file',2) || process.argv.includes('.env',2)  )
    logger.log(`Environment Variable Is Not Set. (Check NodeJS Docs)`,logger.msgType.WARN);

const App = express();
App.use(cors());
// App.use(cors({
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     origin: ['http://localhost:3000']
// }));
App.use(cookieParser());
App.use(express.json());
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

App.get('/createDevice',async (req,res)=>{
    let device = await deviceSchema.create({
        id:"0",
        name:"Device",
        icon:"fa-solid fa-microchip",
        type:"PULSE",
        assignedTo:"",
        isActive:false,
        alert:false
    });
    await device.save();
    res.sendStatus(200);
    logger.log(`/CreateDevice ${clr.Yellow}Created`,logger.msgType.SUCC);
});

App.get('/getDevices',async (req,res)=>{
    let devices = await deviceSchema.find();
    let result = [];
    for(let i = 0; i < devices.length; i++){
        result.push(devices[i].toJSON());

        if(result[i].assignedTo !== ""){
            result[i].assignedTo = (await patientSchema.findById(result[i].assignedTo)).toJSON();
        }
    }
    res.send({devices:result});
    logger.log(`/getDevices`,logger.msgType.SUCC);
});

App.get('/getPatient/:id',async (req,res)=>{
    let patient = await patientSchema.findById(req.params.id);
    res.send({patient});
    logger.log(`/getPatient ${clr.Yellow}${req.params.id}`,logger.msgType.SUCC);

})

App.get('/getPatients',async (req,res)=>{
    let patients = await patientSchema.find();
    res.send({patients});
    logger.log(`/getPatients`,logger.msgType.SUCC);
});

App.post('/',async (req,res)=>{

    if('createPatient' in req.body){
        try{
        let patient = await patientSchema.create({
            id:crypto.randomUUID(),
            name:req.body.name,
            picture:req.body.picture,
            age:req.body.age,
            bloodgroup:req.body.bloodgroup,
            deviceid:req.body.deviceid,
            category:req.body.category,
            address:req.body.address,
            phone:req.body.phone,
        });

        await patient.save();

        let device = await deviceSchema.findOneAndUpdate({id:patient.deviceid},{assignedTo:patient._id});
        await device.save();

        res.sendStatus(200);
        logger.log(`/CreatePatient ${clr.Yellow}Success`,logger.msgType.SUCC);

        }catch(err){
            res.sendStatus(406);
            console.log(err);
            logger.log(`/CreatePatient ${clr.Yellow}Failed`,logger.msgType.ERR);
        }
        return;
    }

});


App.get('/',(req, res)=>{ res.sendStatus(200); });
App.post('/',(req, res)=>{ res.sendStatus(200); });

App.listen(process.env.HOSPITAL_PORT || 3000, ()=>{ logger.log(`Server Started at port ${clr.Yellow}${process.env.HOSPITAL_PORT || 3000}`,logger.msgType.SUCC); });
