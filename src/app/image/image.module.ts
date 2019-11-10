import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageRoutingModule } from './image-routing.module';
import { ImageComponent } from '../image/image.component';
import {
    MatButtonModule, MatDividerModule, MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';


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
        MatButtonModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDividerModule,
        FlexLayoutModule
    ]
})
export class ImageModule { }
