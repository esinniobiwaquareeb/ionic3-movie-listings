import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopratedmoviesPage } from './topratedmovies';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    TopratedmoviesPage,
  ],
  imports: [
    IonicPageModule.forChild(TopratedmoviesPage),
    IonicImageLoader
  ],
})
export class TopratedmoviesPageModule {}
