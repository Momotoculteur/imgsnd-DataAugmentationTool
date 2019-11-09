import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss']
})
export class InfosComponent implements OnInit {

    private folderPath: string;
    private numberImageBeforeAugmentation: number;
    private numberClone: number;
    private numberImageAfterAugmentation: number;

    private electronService: ElectronService;

    constructor() {
        this.folderPath = "Aucun dossier sélectionné";
        this.numberImageBeforeAugmentation = 0;
        this.numberClone = 1;

        this.electronService = new ElectronService();
        this.numberImageAfterAugmentation = this.numberClone * this.numberImageBeforeAugmentation;

        this.initChannels();
    }

  ngOnInit() {
  }

    private selectFolderPath() {
        this.electronService.remote.dialog.showOpenDialog(
            {properties: ['openDirectory']
        }).then( path => {
            this.folderPath = path.filePaths[0];
            this.updateUiInfos();
            this.electronService.ipcRenderer.send('uiUpdateImageInfos', this.folderPath);
        });
    }

    private updateUiInfos() {

    }

    private updateNumberImg(value: number) {
        this.numberClone = value;
        this.updateNumberImgAfterAug();
    }

    private updateNumberImgAfterAug() {
        this.numberImageAfterAugmentation = this.numberClone * this.numberImageBeforeAugmentation;
    }

    private launchDataAug() {
        this.electronService.ipcRenderer.send('launchImgDataAug', "");
    }




    private initChannels() {
        this.electronService.ipcRenderer.on('uiUpdateImageInfosResponse', (event, numberFiles) => {
            this.numberImageBeforeAugmentation = numberFiles;
            this.updateNumberImgAfterAug();
        });
    }

}
