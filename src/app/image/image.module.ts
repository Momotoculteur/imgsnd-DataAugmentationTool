import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageRoutingModule } from './image-routing.module';
import { ImageComponent } from '../image/image.component';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSliderModule, MatSlideToggleModule} from '@angular/material';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ImageComponent],
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
