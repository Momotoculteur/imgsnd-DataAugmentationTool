import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


    private electronService: ElectronService;


    constructor() {
        this.electronService = new ElectronService();
    }

    ngOnInit() {
    }

    private closeApp() {
        this.electronService.remote.getCurrentWindow().close();
    }

    private isFullScreen(): boolean {
        return this.electronService.remote.getCurrentWindow().isMaximized();
    }

    private maximizeApp() {
        this.electronService.remote.getCurrentWindow().maximize();
    }

    private unMaximizeApp() {
        this.electronService.remote.getCurrentWindow().unmaximize();
    }

    private reduceApp() {
        this.electronService.remote.getCurrentWindow().minimize();
    }



}
