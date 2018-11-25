import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { MdbProvider } from "../../providers/mdb/mdb";
import {
  NativePageTransitions,
  NativeTransitionOptions
} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the UpcomingmoviesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-upcomingmovies",
  templateUrl: "upcomingmovies.html"
})
export class UpcomingmoviesPage {
  somethingloading: any = null;
  upcomingfilms = [];
  page = 1;
  maximumpages = 10;
  options: NativeTransitionOptions = {
    duration: 600, // in milliseconds (ms), default 400
    iosdelay: 50, // ms to wait for the iOS webview to update before animation kicks in, default 60
    androiddelay: 100
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public movieService: MdbProvider,
    public toastCtrl: ToastController,
    private nativePageTransitions: NativePageTransitions
  ) {
    this.loadUpcomingMovies();
  }

  ionViewDidLoad() {
   
  }

  loadUpcomingMovies(infiniteScroll?) {
    this.movieService
      .getUpcomingMovies(this.page)
      .then((upcomingmovies: any) => {
        this.upcomingfilms = upcomingmovies.results;
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: "Failed to Load Movies. Try Refreshing",
          duration: 3000,
          position: "top",
          dismissOnPageChange: true,
          cssClass: "fail-toast"
        });
        toast.present();
      });
  }

  loadMoreMovies(infiniteScroll) {
    this.page++;
    this.loadUpcomingMovies(infiniteScroll);

    if (this.page === this.maximumpages) {
      infiniteScroll.enable(false);
    }
  }

  addToWatchlist(film) {
    this.somethingloading = true;
    this.movieService
      .addToWatchlist(film.id, "movie", film.title, film.poster_path)
      .then(res => {
        this.somethingloading = null;
        if (res === true) {
          this.toastCtrl
            .create({
              message: "Added " + film.title + " to Watchlist",
              duration: 2000,
              position: "top",
              cssClass: "add-toast"
            })
            .present();
        } else if (res === "found") {
          this.toastCtrl
            .create({
              message: "Removed " + film.title + " from Watchlist",
              duration: 2000,
              position: "top",
              cssClass: "add-toast"
            })
            .present();
        } else {
          this.toastCtrl
            .create({
              message: "There was an error, Please try again",
              duration: 2000,
              position: "top",
              cssClass: "fail-toast"
            })
            .present();
        }
      })
      .catch(err => {
        this.somethingloading = null;
        this.toastCtrl
          .create({
            message: "There was an error, Please try again",
            duration: 2000,
            position: "top",
            cssClass: "fail-toast"
          })
          .present();
      });
  }

  openDetails(film) {
    this.nativePageTransitions.fade(this.options);
    this.navCtrl.push("ViewMoviePage", { film: film });
  }
}
