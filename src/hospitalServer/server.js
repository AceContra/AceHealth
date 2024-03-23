const express = require('express');
const cors = require('cors');
require('./utils/database');

const clr = require('./utils/color');
const logger = require('./utils/logger');

const patientSchema = require('./schemas/patient');
const settingsSchema = require('./schemas/settings');


if(process.argv.includes('--env-file=.env',2) || process.argv.includes('--env-file',2) || process.argv.includes('.env',2)  )
    logger.log(`Environment Variable Is Not Set. (Check NodeJS Docs)`,logger.msgType.WARN);

const App = express();
App.use(cors());


App.post('/',async (req,res)=>{

    if('createPatient' in req.body){
        try{
        let ride = await patientSchema.create({
            patient:{
                name:req.body.name,
                email:req.body.email,
                picture:req.body.picture
            },

        });

        await ride.save();
        res.sendStatus(200);

        }catch(err){
            res.sendStatus(406);
            console.log(err);
        }
        return;
    }

});


App.get('/',(req, res)=>{ res.sendStatus(200); });
App.post('/',(req, res)=>{ res.sendStatus(200); });

App.listen(process.env.HOSPITAL_PORT || 3000, ()=>{ logger.log(`Server Started at port ${clr.Yellow}${process.env.HOSPITAL_PORT || 3000}`,logger.msgType.SUCC); });
