const electron = require('electron')
const { ipcRenderer } = electron;

const closeBtn = document.getElementById('closeBtn')

// Close window event
closeBtn.addEventListener('click', event => {
    ipcRenderer.send('close-window');
})

// Send the input value to main.js
updateBtn.addEventListener('click', event => {
    ipcRenderer.send('update-notify-value', document.getElementById('notifyVal').value);

    // Close window after user enters input
    ipcRenderer.send('close-window');
} )