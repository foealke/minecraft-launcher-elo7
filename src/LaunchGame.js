exports.listen = () => {
    const { ipcMain } = require('electron')
    ipcMain.on('synchronous-message', (event, arg) => {
        if ( arg.msgtype == "runGame"  ) {
            try {
                console.log("[LAUNCHER] Received request to launch the game")
                launchGame( arg.body.nickname )
                event.returnValue = { status: "success" }
            } catch (error) {
                console.log(error)
                event.returnValue = { status: "failed" }
            }
            

        }
    }
)}
    
const launchGame = ( nickname ) => {
    const { Client, Authenticator } = require('minecraft-launcher-core');
    const launcher = new Client();

    let opts = {
        clientPackage: "null",
        authorization: Authenticator.getAuth( nickname ), 
        root: "./minecraft",
        os: "windows",
        // version: {
        //     "number": "1.12.2",
        //     "type": "release",
        // },
        "version": {
            number: "1.12.2",
            type: "release",
        },
        forge: "./minecraft/modpack.jar",
        memory: {
            max: "6000",
            min: "4000"
        },
        
    }
     
    launcher.launch(opts);
     
    launcher.on('debug', (e) => console.log(e));
    launcher.on('data', (e) => console.log(e));

}


