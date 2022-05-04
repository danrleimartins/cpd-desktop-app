const electron = require('electron')
const { ipcRenderer } = electron;

const closeBtnBRL = document.getElementById('closeBtnBRL');

// Close window event
closeBtnBRL.addEventListener('click', event => {
       ipcRenderer.send('close-window-brl');
})

const updateBtnBRL = document.getElementById('updateBtnBRL');

// Send the input value to main.js
updateBtnBRL.addEventListener('click', event => {
       ipcRenderer.send('update-notify-value-brl', document.getElementById('notifyValBRL').value);

       // Close window after user enters input
       ipcRenderer.send('close-window-brl');
} )

