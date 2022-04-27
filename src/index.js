const electron = require('electron');
const { ipcRenderer } = electron;

// Clicking on the button will trigger the ipcRenderer to send a message to ipcMain to open new window
document.getElementById('notifyBtnEUR').addEventListener('click', event => {
    ipcRenderer.send('main:add');
});