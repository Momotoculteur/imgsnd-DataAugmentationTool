import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {HeaderComponent} from './core/header/header.component';



const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'welcome'
    },
    {
        path: 'welcome',
        loadChildren: './welcome/welcome.module#WelcomeModule'
    },
    {
        path: 'sound',
        loadChildren: './sound/sound.module#SoundModule'
    },
    {
        path: 'image',
        loadChildren: './image/image.module#ImageModule'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
