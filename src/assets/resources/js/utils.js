const $ = ( _object ) => {
    return document.querySelector( _object )
}

const reload = () => {
    window.location = window.location;
}


$('body').style.backgroundColor = "#3c3f52"
// $('#bg-image').style.background = "url('./resources/imgs/bgs/1.png')"
// setInterval( 5000, () => {
//     let img = Math.ceil(Math.random()*4).toString() + ".png"
//     $('bg-image').style.background = "url('./resources/imgs/bgs/"+img+"')"
// })



const customTitlebar = require('custom-electron-titlebar');

window.addEventListener('DOMContentLoaded', () => {
    const titlebar = new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('black'),
        icon:'./resources/imgs/ICON.png',
        menu: false,
        shadow: true,
        maximizable: false,
    });
    titlebar.updateBackground(new customTitlebar.Color(new customTitlebar.RGBA(0, 0, 0, .7)));
    titlebar.updateTitle('ELO7 MC Launcher');
})

function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}



function openGitHub() {
    const { shell } = require('electron')

    shell.openExternal('https://github.com/foealke/minecraft-launcher-elo7')
}