const electron = require('electron');
const { ipcRenderer } = electron;
const axios = require('axios'); // HTTP library that connects to APIs
const path = require('path');

// Notification object
const notification = {
    title: 'BTC Alert',
    body: 'BTC just reached your target price',
    icon: path.join(__dirname, '../assets/img/btc.png')
};

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

            // If statement to check BTC value is empty and if it's less than the current price
            if (targetPriceEUR.innerHTML != '' && targetPriceValEUR < crypto) {
                // If ok, prompts notification to user
                const myNotification = new window.Notification(notification.title, notification);
            }
        })
}
// Run getBTC function and set interval to update price every 10 seconds
getBTCEUR();
setInterval(getBTCEUR, 10000);

// Clicking on the button will trigger the ipcRenderer to send a message to ipcMain to open new window
document.getElementById('notifyBtnEUR').addEventListener('click', event => {
    ipcRenderer.send('main:add');
});

// Receives targetPrice and updates the index.html file
ipcRenderer.on('targetPriceVal', (event, arg) => {
    targetPriceValEUR = Number(arg);
    targetPriceEUR.innerHTML = '€' + targetPriceValEUR.toLocaleString('en');
})

// BTC USD Section
var priceUSD = document.getElementById('priceUSD');
var targetPriceUSD = document.getElementById('targetUSD');
var targetPriceValUSD;

// Function that will fetch the current BTC price from an API, display it to screen and compare to target price
function getBTCUSD() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then(res => {
            const cryptos = res.data.BTC.USD;
            priceUSD.innerHTML = '$' + cryptos.toLocaleString('en');

            // If statement to check BTC value is empty and if it's less than the current price
            if (targetPriceUSD.innerHTML != '' && targetPriceValUSD < cryptos) {
                // If ok, prompts notification to user
                const myNotification = new window.Notification(notification.title, notification);
            }

        })
}
// Run getBTC function and set interval to update price in every 10 seconds
getBTCUSD();
setInterval(getBTCUSD, 10000);

// Clicking on the button will trigger the ipcRenderer to send a message to ipcMain to open new window
document.getElementById('notifyBtnUSD').addEventListener('click', event => {
    ipcRenderer.send('main:addUSD');
});

// Receives targetPrice and updates the index.html file
ipcRenderer.on('targetPriceValUSD', (event, arg) => {
    targetPriceValUSD = Number(arg);
    targetPriceUSD.innerHTML = '$' + targetPriceValUSD.toLocaleString('en');
})

// BTC BRL Section

var priceBRL = document.getElementById('priceBRL');
var targetPriceBRL = document.getElementById('targetBRL');
var targetPriceValBRL;

// Function that will fetch the current BTC price from an API, display it to screen and compare to target price
function getBTCBRL() {
  axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=BRL')
    .then(res => {
      const cryptos = res.data.BTC.BRL;
      priceBRL.innerHTML = 'R$' + cryptos.toLocaleString('en');

      // If statement to check BTC value is empty and if it's less than the current price
      if (targetPriceBRL.innerHTML != '' && targetPriceValBRL < cryptos) {
        // If ok, prompts notification to user
        const myNotification = new window.Notification(notification.title, notification);
      }

    })
}
// Run getBTC function and set interval to update price in every 10 seconds
getBTCBRL();
setInterval(getBTCBRL, 10000);

// Clicking on the button will trigger the ipcRenderer to send a message to ipcMain to open new window
document.getElementById('notifyBtnBRL').addEventListener('click', event => {
  ipcRenderer.send('main:addBRL');
});

// Receives targetPrice and updates the index.html file
ipcRenderer.on('targetPriceValBRL', (event, arg) => {
  targetPriceValBRL = Number(arg);
  targetPriceBRL.innerHTML = '$' + targetPriceValBRL.toLocaleString('en');
})