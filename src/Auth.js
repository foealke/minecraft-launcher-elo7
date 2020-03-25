let playerData = {
    nickname: undefined,
}

exports.listen = ( ) => {
    const { ipcMain } = require('electron')
    const { Client, Authenticator } = require('minecraft-launcher-core');
    ipcMain.on('synchronous-message', (event, arg) => {
            if ( arg.msgtype == "auth"  ) { 
                try {
                    console.log("[AUTH] Received authorization request")
                    if ( arg.body.password ) {
                        Authenticator.getAuth( arg.body.username , arg.body.password )
                        event.returnValue = { status: "online_mode" }
                    } else { 
                        Authenticator.getAuth( arg.body.username )
                        event.returnValue = { status: "offline_mode" }
                        playerData.nickname = arg.body.username
                    }
                    


                } catch (error) {
                    console.log(error)
                    event.returnValue = { status: "failed" }
                }
            }
    })
}

exports.getPlayerNickname = ( ) => {
    return playerData.nickname
}

