const { app, BrowserWindow } = require('electron')

function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    titleBarStyle: 'hiden'

  })

  win.loadURL('http://localhost:4200/')
}

app.on('ready', createWindow)