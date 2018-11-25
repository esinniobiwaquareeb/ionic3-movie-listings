import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodayshowsPage } from './todayshows';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    TodayshowsPage,
  ],
  imports: [
    IonicPageModule.forChild(TodayshowsPage),
    IonicImageLoader
  ],
})
export class TodayshowsPageModule {}
