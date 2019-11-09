const { app, BrowserWindow } = require('electron')

let win, isToolsDev;
const args = process.argv.slice(1);
isToolsDev = args.some(val => val === "--devTools");

function createWindow () {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
        nodeIntegration: true
    },
        frame: false,
        titleBarStyle: 'hiden'
    });

    win.loadURL('http://localhost:4200/')

    if(isToolsDev) {
        win.webContents.openDevTools();
    }

}

app.on('ready', createWindow)
