const { app, BrowserWindow, Menu, ipcMain } = require('electron');

// The shell module allows us to manage files and URLs
const shell = require('electron').shell;

// Creating browser window
let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 850,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });
    // And load index.html file
    win.loadFile('src/index.html');

    // Open development tools to help troubleshoot code
    win.webContents.openDevTools();

    // Creating the app's menu
    var menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                {
                    label: 'MarketCap',
                    click() {
                        shell.openExternal('https://www.dailyfx.com/eur-usd')
                    }
                },
                {
                    label: 'GitHub Repository',
                    click() {
                        shell.openExternal('https://github.com/danrleimartins/electron-btc-app')
                    }
                },
                { type: 'separator' },
                {
                    label: 'Exit',
                    click() {
                        app.quit()
                    }
                },
            ]
        },
    ]);
    Menu.setApplicationMenu(menu);

}

// Exiting app when closing the window
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})

// This method will be called when Electron has finished initilization and is ready to open
// the browser window.
app.whenReady().then(() => {
    createWindow();
})

// Creating new window
let addWindowEUR;

ipcMain.on('main:add', event => {
    addWindowEUR = new BrowserWindow({
        width: 500,
        height: 200,
        frame: false, //removes top toolbar
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    // Loading add.html file into new window
    addWindowEUR.loadURL(`file://${__dirname}/src/add.html`);

    //addWindowEUR.webContents.openDevTools();

    addWindowEUR.on('closed', () => {
        addWindowEUR = null;
    });
});

// Closing window event
ipcMain.on('close-window', event => {

    //close the window object
    addWindowEUR.close();

})

// Catch the input from add.html and send it back to index.js
ipcMain.on('update-notify-value', (event, arg) => {
    win.webContents.send('targetPriceVal', arg);
})

// BTC USD Add Window
let addWindowUSD;

ipcMain.on('main:addUSD', event => {
    addWindowUSD = new BrowserWindow({
        width: 500,
        height: 200,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    addWindowUSD.loadURL(`file://${__dirname}/src/usd.html`);

    //addWindowUSD.webContents.openDevTools();

    addWindowUSD.on('closed', () => {
        addWindowUSD = null;
    });
});

// Closing window event
ipcMain.on('close-window-usd', event => {

    //close the window object
    addWindowUSD.close();

})

// Catch the input from usd.html and send it back to index.js
ipcMain.on('update-notify-value-usd', (event, arg) => {
    win.webContents.send('targetPriceValUSD', arg);
})

// BTC BRL Add Window
let addWindowBRL;

ipcMain.on('main:addBRL', event => {
    addWindowBRL = new BrowserWindow({
        width: 500,
        height: 200,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    addWindowBRL.loadURL(`file://${__dirname}/src/brl.html`);

    //addWindowBRL.webContents.openDevTools();

    addWindowBRL.on('closed', () => {
        addWindowUSD = null;
    });
});

// Closing window event
ipcMain.on('close-window-brl', event => {

    //close the window object
    addWindowBRL.close();

})

// Catch the input from brl.html and send it back to index.js
ipcMain.on('update-notify-value-brl', (event, arg) => {
    win.webContents.send('targetPriceValBRL', arg);
})