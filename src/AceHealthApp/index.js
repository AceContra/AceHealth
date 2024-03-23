const { app, BrowserWindow } = require('electron')
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    const startURL = true
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, './frontend/build/index.html')}`;
    
    win.loadURL(startURL);
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
