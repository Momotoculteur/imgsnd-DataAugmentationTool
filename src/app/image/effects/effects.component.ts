import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-effects',
  templateUrl: './effects.component.html',
  styleUrls: ['./effects.component.scss']
})
export class EffectsComponent implements OnInit {


    private gaussianBlurValueMin: number;
    private gaussianBlurValueMax: number;
    private gaussianBlurMin: number;
    private gaussianBlurMax: number;
    private gaussianBlurStep: number;


    constructor() {
        this.gaussianBlurValueMin = 0;
        this.gaussianBlurValueMax = 100;
        this.gaussianBlurMax = 100;
        this.gaussianBlurMin = 0;
        this.gaussianBlurStep = 1;
    }

  ngOnInit() {
  }

}
