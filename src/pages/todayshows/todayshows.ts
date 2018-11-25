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
 * Generated class for the TodayshowsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-todayshows",
  templateUrl: "todayshows.html"
})
export class TodayshowsPage {
  somethingloading: any = null;
  films = [];
  popfilms = [];
  upcomingfilms = [];
  series = [];
  popseries = [];
  todayseries = [];
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
    this.loadtodaytvShows();
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
  loadtodaytvShows(infiniteScroll?) {
    this.movieService
      .getTodaytvShows(this.page)
      .then(tvshows => {
        this.todayseries = this.todayseries.concat(tvshows["results"]);
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: "Failed to Load TV Shows. Try Refreshing",
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
    this.loadtodaytvShows(infiniteScroll);

    if (this.page === this.maximumpages) {
      infiniteScroll.enable(false);
    }
  }

  addToWatchlist(serie) {
    this.somethingloading = true;
    this.movieService
      .addToWatchlist(serie.id, "movie", serie.name, serie.poster_path)
      .then(res => {
        this.somethingloading = null;
        if (res === true) {
          this.toastCtrl
            .create({
              message: "Added " + serie.name + " to Watchlist",
              duration: 2000,
              position: "top",
              cssClass: "add-toast"
            })
            .present();
        } else if (res === "found") {
          this.toastCtrl
            .create({
              message: "Removed " + serie.name + " from Watchlist",
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

  openSeriesDetails(serie) {
    this.nativePageTransitions.fade(this.options);
    this.navCtrl.push("ViewShowPage", { film: serie });
  }
}
