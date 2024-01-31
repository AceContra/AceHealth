console.log("helloworld");
const express = require('express');

// Utils Modules
const clr = require('./utils/color');
const logger = require('./utils/logger');

// Server
const App = express()

App.get('/',(req, res)=>{

})

App.listen(process.env.HOSPITAL_PORT || 3000, ()=>{
    logger.log(`Server Started at port ${clr.Yellow}${process.env.HOSPITAL_PORT || 3000}`,logger.msgType.SUCC);
})

if(!process.argv.find('--env-file'))
    logger.log(`Environment Variable Is Not Set.`,logger.msgType.WARN);