

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
    const remote = require('electron').remote
    let w = remote.getCurrentWindow()
    w.hide()
}

$('#login-btn').addEventListener('click', proceed )

function openSettings() {
    $("#main").hidden = true
    $("#settings").hidden = false
}

function openMainscreen() {
    $("#main").hidden = false;
    $("#settings").hidden = true;
}

$("#menu-btn").addEventListener("click", openSettings)
$("#back-btn").addEventListener("click", openMainscreen)

