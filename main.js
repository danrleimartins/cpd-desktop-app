const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    });
    // and load the index.html of the app.
    win.loadFile('src/index.html');

    // open development tools to help troubleshoot code
    win.webContents.openDevTools();

}

// Exiting app when closing the window
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})

// This method will be called when Electron has finished initilization and is ready to create
// the browser window.
app.whenReady().then(() => {
    createWindow();
})