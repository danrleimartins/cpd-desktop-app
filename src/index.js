const electron = require('electron');
const { ipcRenderer } = electron;
const axios = require('axios'); // HTTP library that connects to APIs

// BTC EUR Section
var priceEUR = document.getElementById('priceEUR');
var targetPriceEUR = document.getElementById('targetPriceEUR');
var targetPriceValEUR;

// Function that will fetch the current BTC price from an API, display it to screen and compare to target price
function getBTCEUR() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=EUR')
        .then(res => {
            const crypto = res.data.BTC.EUR;
            priceEUR.innerHTML = '€' + crypto.toLocaleString('en');

        })
}
// Run getBTC function and set interval to update price every 10 seconds
getBTCEUR();
setInterval(getBTCEUR, 10000);

// Clicking on the button will trigger the ipcRenderer to send a message to ipcMain to open new window
document.getElementById('notifyBtnEUR').addEventListener('click', event => {
    ipcRenderer.send('main:add');
});

