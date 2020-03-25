exports.listen = () => {
    const { ipcMain } = require('electron')
    ipcMain.on('synchronous-message', (event, arg) => {
        if ( arg.msgtype == "updateSettings" ) {
                const fs = require('fs')
                let settingsString = JSON.stringify( arg.body )
                fs.writeFile("./client-settings.json", settingsString, 'utf8', function (err) {
                    if (err) {
                        console.log("An error occured while writing JSON Object to File.");
                        event.returnValue = { status: "failed" }
                        return console.log(err);
                        
                    }
                    event.returnValue = { status: "success" }
                    console.log("JSON file has been saved.");
                });
            }
    })
}