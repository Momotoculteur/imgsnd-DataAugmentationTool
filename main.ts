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


                        for(let currentImageIndex = 0 ; currentImageIndex < message.cloneNumber ; currentImageIndex++)
                        {
                            var currentImage = img.clone();

                            let suffixeNameFile = '';
                            if (message.effects.blur.active) {
                                let alea = Math.floor(Math.random() * (message.effects.blur.maxValue - message.effects.blur.minValue + 1)) + message.effects.blur.minValue;

                                if (alea !== 0) {
                                    currentImage.blur(alea);
                                }
                                suffixeNameFile += '_blur';
                            }
                            if (message.effects.flip.active) {
                                let v,h;
                                if (message.effects.flip.vertical) {
                                    v = trueOrFalseGenerator();
                                } else {
                                    v = false;
                                }
                                if (message.effects.flip.horizontal) {
                                    h = trueOrFalseGenerator();
                                } else {
                                    h = false;
                                }
                                currentImage.flip(h, v);
                                suffixeNameFile += '_flip';
                            }

                            // BETAAAAAAAAAAAAAAAAAAAAAAA
                            //currentImage.displace(map, 10);

                            ///////////////////////////////






                            suffixeNameFile += '_clone' + '_' + currentImageIndex.toString();

                            let currentNameFile = file.split('.');
                            currentNameFile.pop();


                            let savePath = message['pathFolder'] + '\\' + currentNameFile + suffixeNameFile + '.' + message.saveFormat;


                            currentImage.write(savePath);
                        }


                    }).catch( (error) => {
                            console.log(error);
                    });
            };
        });
    });
});


function trueOrFalseGenerator() {
    var random = Math.random();
    if(random<0.5){
        return false;
    } else{
        return true;
    }
}






