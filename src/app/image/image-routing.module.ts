import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImageComponent} from './image.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'mainImagePage'
    },
    {
        path: 'mainImagePage',
        component: ImageComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageRoutingModule { }
