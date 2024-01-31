const color = require('./color')

const msgType = {
    ERR:'ERR',
    WARN:'WARN',
    SUCC:'SUCC',
    NONE:'',
}

function log(message, messageType=msgType.NONE){
    console.log( 
        color.Reset + color.BgGray + color.White +
        (new Date().toISOString().split('T')[1].split('.')[0]) +

        (messageType == msgType.NONE ?msgType.NONE:
            color.Reset + ' ' + color.Bright + 
            (messageType==msgType.ERR ? color.BgRed    :
             messageType==msgType.WARN? color.BgYellow :
             messageType==msgType.SUCC? color.BgGreen  :
             msgType.NONE) +
            messageType
        ) + color.Reset,

        message,
        color.Reset
    )
}

module.exports = {msgType, log}
