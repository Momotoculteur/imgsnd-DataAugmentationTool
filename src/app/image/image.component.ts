import {Component, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {SaveFormatSelect} from '../../shared/interface/SaveFormatSelect';
import {SaveFormat} from '../../shared/enum/SaveFormat';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {


    /***********   SERVICE   **********/
    private electronService: ElectronService;


    /***********   GENERAL   **********/
    private folderPath: string;
    private numberImageBeforeAugmentation: number;
    private numberClone: number;
    private numberImageAfterAugmentation: number;
    private saveFormatList: SaveFormatSelect[];
    private saveFormat: SaveFormat;

    /***********   EFFECTS   **********/
    private gaussianBlurActive: boolean;
    private gaussianBlurValueMin: number;
    private gaussianBlurValueMax: number;
    private gaussianBlurMin: number;
    private gaussianBlurMax: number;
    private gaussianBlurStep: number;

    private flipActive: boolean;
    private flipHorizontal: boolean;
    private flipVertical: boolean;


    constructor() {


        this.folderPath = "Aucun dossier sélectionné";
        this.numberImageBeforeAugmentation = 0;
        this.numberClone = 1;
        this.saveFormatList = [
            {value: '', viewValue: SaveFormat.PNG},
            {value: '', viewValue: SaveFormat.JPEG},
            {value: '', viewValue: SaveFormat.BPM},
            {value: '', viewValue: SaveFormat.TIFF},
            {value: '', viewValue: SaveFormat.GIF}
        ];
        this.saveFormat = SaveFormat.PNG;


        this.electronService = new ElectronService();
        this.numberImageAfterAugmentation = this.numberClone * this.numberImageBeforeAugmentation;

        /***********   INIT EFFECTS   **********/
        this.gaussianBlurActive = false;
        this.gaussianBlurValueMin = 0;
        this.gaussianBlurValueMax = 100;
        this.gaussianBlurMax = 100;
        this.gaussianBlurMin = 0;
        this.gaussianBlurStep = 1;

        this.flipActive = false;
        this.flipHorizontal = false;
        this.flipVertical = false;

        this.initChannels();
    }

    ngOnInit() {
    }

    private selectFolderPath() {
        this.electronService.remote.dialog.showOpenDialog(
            {properties: ['openDirectory']
            }).then( path => {
            if (path.filePaths.length > 0) {
                this.folderPath = path.filePaths[0];
                this.electronService.ipcRenderer.send('uiUpdateImageInfos', this.folderPath);
            } else {
                console.log("aucun fichier de choisit");
            }
        }).catch( error => {
            console.log(error);
        });
    }



    private updateNumberImg(value: number) {
        this.numberClone = value;
        this.updateNumberImgAfterAug();
    }

    private updateNumberImgAfterAug() {
        this.numberImageAfterAugmentation = this.numberClone * this.numberImageBeforeAugmentation;
    }

    private launchDataAug() {
        let message = {
            'pathFolder': this.folderPath,
            'effects' : {
                'blur': {
                    'active': this.gaussianBlurActive,
                    'minValue': this.gaussianBlurValueMin,
                    'maxValue': this.gaussianBlurValueMax
                },
                'flip': {
                    'active': this.flipActive,
                    'horizontal': this.flipHorizontal,
                    'vertical': this.flipVertical
                }
            }
        }
        console.log(this.gaussianBlurActive)
        this.electronService.ipcRenderer.send('launchImgDataAug', message);
    }

    private initChannels() {
        this.electronService.ipcRenderer.on('uiUpdateImageInfosResponse', (event, numberFiles) => {
            console.log(numberFiles)
            this.numberImageBeforeAugmentation = numberFiles;
            this.updateNumberImgAfterAug();
        });
    }

}
