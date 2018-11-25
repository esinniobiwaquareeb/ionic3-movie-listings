import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopratedshowsPage } from './topratedshows';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    TopratedshowsPage,
  ],
  imports: [
    IonicPageModule.forChild(TopratedshowsPage),
    IonicImageLoader
  ],
})
export class TopratedshowsPageModule {}
