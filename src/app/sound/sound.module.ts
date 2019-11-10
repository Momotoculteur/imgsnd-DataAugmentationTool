import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoundRoutingModule } from './sound-routing.module';
import { SoundComponent } from '../sound/sound.component';


@NgModule({
  declarations: [SoundComponent],
  imports: [
    CommonModule,
    SoundRoutingModule
  ]
})
export class SoundModule { }
