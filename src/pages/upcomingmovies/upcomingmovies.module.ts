import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpcomingmoviesPage } from './upcomingmovies';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    UpcomingmoviesPage,
  ],
  imports: [
    IonicPageModule.forChild(UpcomingmoviesPage),
    IonicImageLoader
  ],
})
export class UpcomingmoviesPageModule {}
