const settings = require('../client-settings.json')
const { app, BrowserWindow } = require('electron')

let win;



const createWindow = () => {
    win = new BrowserWindow({
        frame: false,
        width: settings.client.width,
        height: settings.client.height,
        transparent:true,
        resizable: false,
        icon: './assets/resources/imgs/ICON.ico',
        webPreferences: {
            nodeIntegration: true,
        }
    })
    win.loadFile('./assets/main.html')

    //Service workers
    require('./Auth.js').listen()
    require('./LaunchGame.js').listen()
    require('./Settings.js').listen()

}

app.whenReady().then(createWindow)




