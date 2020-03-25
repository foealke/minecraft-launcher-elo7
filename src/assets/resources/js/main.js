

function proceed()  {
    $('#spinner-loader').hidden = false;
    $('#login-btn').disabled = true;
    const { ipcRenderer } = require('electron')
    $('#error-element').innerHTML = ""
    if ( $('#login-username-input').value.length < 4 ) {
        $('#error-element').innerHTML = "ERROR: Za krótki nick! Minimum 4 znaki"
        $('#login-btn').disabled = false;
        $('#spinner-loader').hidden = true;
        return
    } 

    let res = ipcRenderer.sendSync('synchronous-message', 
    { 
        msgtype: "auth",
        body: {
            username: $('#login-username-input').value,
            password: false,
        }
    } ) 

    console.log(ipcRenderer.sendSync('synchronous-message', 
    { 
        msgtype: "runGame",
        body: {
            nickname: $('#login-username-input').value,
        }
    }))
    // const remote = require('electron').remote
    // let w = remote.getCurrentWindow()
    // w.hide()
}

$('#login-btn').addEventListener('click', proceed )

function openSettings() {
    $("#main").hidden = true
    $("#settings").hidden = false
    loadSettings()
}

function openMainscreen() {
    $("#main").hidden = false;
    $("#settings").hidden = true;
}

$("#menu-btn").addEventListener("click", openSettings)
$("#back-btn").addEventListener("click", openMainscreen)

$("#select-ram").addEventListener("change", () => {     
     switch ( $("#select-ram").value ) {
         case "8":
            $("#ram-range").value = 3140;
            $("#ram-label").innerHTML = $("#ram-range").value+" <b>MB RAM'u</b>"
            break;
        case "12":
            $("#ram-range").value = 4096;
            $("#ram-label").innerHTML = $("#ram-range").value+" <b>MB RAM'u</b>"
            break;
        case "16":
            $("#ram-range").value = 6144;
            $("#ram-label").innerHTML = $("#ram-range").value+" <b>MB RAM'u</b>"
            break;
         default:
            $("#ram-range").value = 3140;
            $("#ram-label").innerHTML = $("#ram-range").value+" <b>MB RAM'u</b>"
             break;
     }
})

$("#ram-range").addEventListener("input", () => {
    $("#ram-label").innerHTML = $("#ram-range").value+" <b>MB RAM'u</b>"
})



$("#save-btn").addEventListener("click", () => {
    const { ipcRenderer } = require('electron')
    ipcRenderer.sendSync('synchronous-message', 
    { 
        msgtype: "updateSettings",
        body: {
            "client": {
                "width": 1280,
                "height": 720
            },
            "game": {
                "ram": $("#ram-range").value
            }
        }
    })
    
})

 
const loadSettings = () => {
    $("#ram-range").value = require("../../client-settings.json").game.ram
    $("#ram-label").innerHTML = $("#ram-range").value+" <b>MB RAM'u</b>"
}

loadSettings()