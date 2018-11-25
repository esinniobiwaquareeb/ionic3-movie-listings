import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviesPage } from './movies';
import { PipesModule } from "../../pipes/pipes.module";
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    MoviesPage,
  ],
  imports: [
    IonicPageModule.forChild(MoviesPage),
    PipesModule,
    IonicImageLoader
  ],
})
export class MoviesPageModule {}
