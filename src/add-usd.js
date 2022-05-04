const electron = require('electron')
const { ipcRenderer } = electron;

const closeBtnUSD = document.getElementById('closeBtnUSD');

// Close window event
closeBtnUSD.addEventListener('click', event => {
    ipcRenderer.send('close-window-usd');
})

const updateBtnUSD = document.getElementById('updateBtnUSD');

// Send the input value to main.js
updateBtnUSD.addEventListener('click', event => {
    ipcRenderer.send('update-notify-value-usd', document.getElementById('notifyValUSD').value);

    // Close window after user enters input
    ipcRenderer.send('close-window-usd');
})

