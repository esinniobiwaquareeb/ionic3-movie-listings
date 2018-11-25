import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ViewMoviePage } from "./view-movie";
import { IonicImageLoader } from "ionic-image-loader";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [ViewMoviePage],
  imports: [
    IonicPageModule.forChild(ViewMoviePage),
    PipesModule,
    IonicImageLoader
  ]
})
export class ViewMoviePageModule {}
