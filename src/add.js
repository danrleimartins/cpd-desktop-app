const electron = require('electron')
const { ipcRenderer } = electron;

const closeBtn = document.getElementById('closeBtn')

// Close window event
closeBtn.addEventListener('click', event => {
    ipcRenderer.send('close-window');
})