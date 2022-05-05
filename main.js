const { app, BrowserWindow, Menu, ipcMain } = require('electron');

// The shell module allows us to manage files and URLs
const shell = require('electron').shell;

// Set environment
process.env.NODE_ENV = 'development';

// Creating browser windows
let win;
let addWindowEUR;
let addWindowUSD;
let addWindowBRL;

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
}

// Exiting app when closing the window
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})

// This method will be called when Electron has finished initilization and is ready to open
// the browser window.
app.whenReady().then(() => {
    createWindow();

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
})

// Create app's menu
const mainMenuTemplate = [
    {
        label: 'Menu',
        submenu: [
            {
                label: 'Bitcoin (BTC) Price Index',
                click() {
                    shell.openExternal('https://cointelegraph.com/bitcoin-price')
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
    }
];

// If OSX, add empty object to menu
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}
// Add developer tools option if in dev
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                role: 'reload'
            },
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}

// Add window event
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