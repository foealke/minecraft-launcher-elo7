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
    const request = require("request");
    let settings = require("../client-settings.json")
    let version = require("../minecraft/version.json").version
    let ram = settings.game.ram

    //checking version
    request.get("https://pobieranieag.herokuapp.com/version_modpack_latest", (err, res, body) => {
        let json = JSON.parse(body)
        let latestVersion = json.version
        let cl = null;
        if ( version != latestVersion ) {
            cl = "http://pobieranieag.herokuapp.com/download_modpack_latest"
        }

        let opts = {
            clientPackage: cl,
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
            forge: "./minecraft/forge.jar",
            memory: {
                max: ram,
                min: Math.round( ram / 1.5 )
            },
            
        }
         
        launcher.launch(opts);
         
        launcher.on('debug', (e) => console.log(e));
        launcher.on('data', (e) => console.log(e));
    })  
}


