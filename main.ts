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
        let i = 0;
        files.forEach( (file) => {
            if ( (file.includes('.png'))
            || (file.includes('.jpg'))
            || (file.includes('.jpeg')) ) {
                i++;
            }
        });
        event.reply('uiUpdateImageInfosResponse', i);
    });

});

ipcMain.on('launchImgDataAug', (event, message) => {
    fs.readdir(message['pathFolder'], (err, files) => {
        files.forEach( (file) => {
            if ( (file.includes('.png'))
                || (file.includes('.jpg'))
                || (file.includes('.jpeg')) ) {
                //pathImg = message['pathFolder'] + "\\" + file

                Jimp.read(message['pathFolder'] + '\\' + file)
                    .then( img => {
                        if (message.effects.blur.active) {
                            console.log("BLUR ACTIVE");
                            min = Math.ceil(message.effects.blur.minValue);
                            max = Math.floor(message.effects.blur.maxValue);
                            alea = Math.floor(Math.random() * (max - min + 1)) + min;
                            img.blur(alea);
                        }
                        if (message.effects.flip.active) {
                            img.flip(message.effects.flip.horizontal, message.effects.flip.vertical);
                        }

                        //let savePath =


                        img.write('test.png');

                    }).catch( (error) => {
                            console.log(error);
                    });
            };
        });
    });
});






