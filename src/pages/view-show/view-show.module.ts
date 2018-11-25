import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ViewShowPage } from "./view-show";
import { IonicImageLoader } from "ionic-image-loader";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [ViewShowPage],
  imports: [
    IonicPageModule.forChild(ViewShowPage),
    PipesModule,
    IonicImageLoader
  ]
})
export class ViewShowPageModule {}
