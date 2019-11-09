import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from '../welcome/welcome.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material';



@NgModule({
    declarations: [WelcomeComponent],
    imports: [
        CommonModule,
        WelcomeRoutingModule,
        FlexLayoutModule,
        MatButtonModule
    ]
})
export class WelcomeModule { }
