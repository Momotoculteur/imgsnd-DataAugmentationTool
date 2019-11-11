import {Component, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {SaveFormatSelect} from '../../shared/interface/SaveFormatSelect';
import {SaveFormat} from '../../shared/enum/SaveFormat';
import {ThemeColor} from '../../shared/enum/ThemeColor';

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

    private heigthInputState: boolean;
    private widthInputState: boolean;

    /********** CSS BINDING ***********/
    private resizeLabelColorHeight: ThemeColor;
    private resizeLabelColorWidth: ThemeColor;

    private resizeWidthLabelState: boolean;
    private resizeHeightLabelState: boolean;

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

    private resizeActive: boolean;
    private resizeHeight: number;
    private resizeWidth: number;
    private resizeHeigthAuto: boolean;
    private resizeWidthAuto: boolean;

    private rotateActive: boolean;
    private rotationMinValue: number;
    private rotationMaxValue: number;
    private rotationStep: number;
    private rotationMax: number;
    private rotationMin: number;



    constructor() {


        this.folderPath = 'Aucun dossier sélectionné';
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

        this.heigthInputState = false;
        this.widthInputState = false;

        this.resizeLabelColorHeight = ThemeColor.YELLOW;
        this.resizeLabelColorWidth = ThemeColor.YELLOW;

        this.resizeWidthLabelState = false;
        this.resizeHeightLabelState = false;

        this.electronService = new ElectronService();
        this.numberImageAfterAugmentation = this.numberClone * this.numberImageBeforeAugmentation;

        /***********   INIT EFFECTS   **********/
        this.gaussianBlurActive = false;
        this.gaussianBlurValueMin = 0;
        this.gaussianBlurValueMax = 10;
        this.gaussianBlurMax = 10;
        this.gaussianBlurMin = 0;
        this.gaussianBlurStep = 1;

        this.flipActive = false;
        this.flipHorizontal = false;
        this.flipVertical = false;

        this.resizeActive = false;
        this.resizeHeigthAuto = false;
        this.resizeWidthAuto = false;
        this.resizeHeight = 0;
        this.resizeWidth = 0;

        this.rotateActive = false;
        this.rotationMinValue = 0;
        this.rotationMaxValue = 0;
        this.rotationMax = 360;
        this.rotationMin = 0;
        this.rotationStep = 1




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
                console.log('aucun fichier de choisit');
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
        if (this.folderPath === 'Aucun dossier sélectionné') {

        } else {
            const message = {
                pathFolder: this.folderPath,
                cloneNumber: this.numberClone,
                saveFormat: this.saveFormat,
                effects : {
                    blur: {
                        active: this.gaussianBlurActive,
                        minValue: this.gaussianBlurValueMin,
                        maxValue: this.gaussianBlurValueMax
                    },
                    flip: {
                        active: this.flipActive,
                        horizontal: this.flipHorizontal,
                        vertical: this.flipVertical
                    },
                    resize: {
                        active: this.resizeActive,
                        width: this.resizeWidth,
                        height: this.resizeHeight,
                        widthAuto: this.resizeWidthAuto,
                        heightAuto: this.resizeHeigthAuto
                    },
                    rotation: {
                        active: this.rotateActive,
                        minValue: this.rotationMinValue,
                        maxValue: this.rotationMaxValue
                    }
                }
            };
            this.electronService.ipcRenderer.send('launchImgDataAug', message);
        }
    }


    private initChannels() {
        this.electronService.ipcRenderer.on('uiUpdateImageInfosResponse', (event, numberFiles) => {
            console.log(numberFiles)
            this.numberImageBeforeAugmentation = numberFiles;
            this.updateNumberImgAfterAug();
        });
    }


    private switchHeightState() {
       this.heigthInputState = !this.heigthInputState;
       if (this.heigthInputState) {
           this.resizeLabelColorHeight = ThemeColor.BLACK;
           this.resizeWidthLabelState = true;
       } else {
           this.resizeLabelColorHeight = ThemeColor.YELLOW;
           this.resizeWidthLabelState = false;

       }
    }


    private switchWidthState() {
        this.widthInputState = !this.widthInputState;
        if (this.widthInputState) {
            this.resizeLabelColorWidth = ThemeColor.BLACK;
            this.resizeHeightLabelState = true;
        } else {
            this.resizeLabelColorWidth = ThemeColor.YELLOW;
            this.resizeHeightLabelState = false;
        }
    }

}
