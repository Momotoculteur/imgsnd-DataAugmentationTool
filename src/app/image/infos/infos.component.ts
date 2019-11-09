import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss']
})
export class InfosComponent implements OnInit {

    private folderPath: string;
    private numberImagesStock: number;

    private electronService: ElectronService;

    constructor() {
        this.folderPath = "Aucun dossier sélectionné";
        this.numberImagesStock = 0;

        this.electronService = new ElectronService();
    }

  ngOnInit() {
  }

    private selectFolderPath() {
        this.electronService.remote.dialog.showOpenDialog(
            {properties: ['openDirectory']
        }).then( path => {
            this.folderPath = path.filePaths[0];
            this.updateUiInfos();
        });
    }

    private updateUiInfos() {

    }

}
