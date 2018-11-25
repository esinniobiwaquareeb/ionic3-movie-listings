import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NowplayingmoviesPage } from './nowplayingmovies';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    NowplayingmoviesPage,
  ],
  imports: [
    IonicPageModule.forChild(NowplayingmoviesPage),
    IonicImageLoader
  ],
})
export class NowplayingmoviesPageModule {}
