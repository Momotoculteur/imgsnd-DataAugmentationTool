import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageRoutingModule } from './image-routing.module';
import { ImageComponent } from '../image/image.component';
import { EffectsComponent } from './effects/effects.component';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSliderModule, MatSlideToggleModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { InfosComponent } from './infos/infos.component';


@NgModule({
  declarations: [ImageComponent, EffectsComponent, InfosComponent],
    imports: [
        CommonModule,
        ImageRoutingModule,
        MatSlideToggleModule,
        MatSliderModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule

    ]
})
export class ImageModule { }
