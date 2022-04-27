const { app, BrowserWindow, Menu } = require('electron');

// The shell module allows us to manage files and URLs
const shell = require('electron').shell; 

// Creating browser window
let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 850,
        height: 600
    });
    // And load the index.html of the app.
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
                { type: 'separator' },
                {
                    label: 'Exit',
                    click() {
                        app.quit()
                    }
                },
            ]
        },
        //Multiple menus
        {
            label: 'Info',
            submenu: [
                {
                    label : 'GitHub Repository',
                    click() {
                        shell.openExternal('https://github.com/danrleimartins/electron-btc-app')
                    }
                }
            ]
        }
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