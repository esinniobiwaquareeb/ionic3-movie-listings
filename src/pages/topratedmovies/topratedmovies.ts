import { Component } from "@angular/core";
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
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
 * Generated class for the TopratedmoviesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-topratedmovies",
  templateUrl: "topratedmovies.html"
})
export class TopratedmoviesPage {
  somethingloading: any = null;
  topratedfilms = [];
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
    private nativePageTransitions: NativePageTransitions,
    public admob: AdMobFree
  ) {
    this.loadtopratedMovies();
      this.launchInterstitial();

  }

  ionViewDidLoad() {}

  launchInterstitial() {

    let interstitialConfig: AdMobFreeInterstitialConfig = {
      // isTesting: true, // Remove in production
      autoShow: true,
      id: "ca-app-pub-5290709468139114/4196817388",
      //id: Your Ad Unit ID goes here
    };

    this.admob.interstitial.config(interstitialConfig);

    this.admob.interstitial.prepare().then(() => {
      // success
    });

  }

  loadtopratedMovies(infiniteScroll?) {
    this.movieService
      .getUpcomingMovies(this.page)
      .then(upcomingmovies => {
        this.topratedfilms = this.topratedfilms.concat(
          upcomingmovies["results"]
        );
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
    this.loadtopratedMovies(infiniteScroll);

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
