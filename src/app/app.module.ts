import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatToolbarModule} from '@angular/material';
import { WelcomeComponent } from './welcome-module/welcome.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        FlexLayoutModule,
        MatButtonModule,
        NgxElectronModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
