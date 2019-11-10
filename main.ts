const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
const fs = require('fs');
var Jimp = require('jimp');
var path = require('path');

let win, isToolsDev;
const args = process.argv.slice(1);
isToolsDev = args.some(val => val === "--devTools");


function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
        frame: false,
        titleBarStyle: 'hidden',
        icon: './src/assets/icon/icon_transparent.png',
        show: false
    });

    win.loadURL('http://localhost:4200/')

    win.once('ready-to-show', () => {
        win.show();
    })

    if(isToolsDev) {
        win.webContents.openDevTools();
    }

}


app.on('ready', createWindow);




ipcMain.on('uiUpdateImageInfos', (event, pathFolder) => {
    fs.readdir(pathFolder.toString(), (err, files) => {
        //event.reply('uiUpdateImageInfosResponse', files.length);
        files.filter(extension).forEach( (value) => {
            console.log(value);
        });
    });
});

ipcMain.on('launchImgDataAug', (event, message) => {
    console.log(message);
});



function extension(element) {
    var extName = path.extname(element);
    return extName === '.txt' // change to whatever extensions you want
};
