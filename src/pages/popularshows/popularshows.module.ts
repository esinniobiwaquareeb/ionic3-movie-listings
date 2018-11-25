import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopularshowsPage } from './popularshows';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    PopularshowsPage,
  ],
  imports: [
    IonicPageModule.forChild(PopularshowsPage),
    IonicImageLoader
  ],
})
export class PopularshowsPageModule {}
