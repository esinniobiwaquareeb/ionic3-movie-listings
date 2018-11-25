import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  PopoverController
} from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { MdbProvider } from "../../providers/mdb/mdb";
import { Observable } from "rxjs/Observable";
import moment from "moment";
import { PopoverPage } from "./popover";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  somethingloading: any = null;
  profilesegment = "info";
  displayPic: any;
  name: any;
  watchlist: any;
  favourites: any;
  greeting: any;
  time: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthProvider,
    private movieService: MdbProvider,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController
  ) {
    this.getTime().subscribe(res => {
      this.time = res;
      var greetings = [
        "Is it not a great " + this.time + "?",
        "Have a wonderful " + this.time + "",
        "Good" + this.time + "",
        "Blessed " + this.time + "",
        "Any plans this " + this.time + "?"
      ];
      this.greeting = greetings[Math.floor(Math.random() * greetings.length)];
    });
    this.getUserDetails();
    this.getWatchlist();
    this.getFavourites();
  }

  getTime() {
    let observable = new Observable(observer => {
      let timeA = moment().format("h");
      let timeB = moment().format("a");
      let timeC = parseFloat(timeA);
      console.log(timeA, timeB);
      if (timeB === "am") {
        if (timeC >= 5 && timeC <= 11) {
          observer.next("morning");
        } else if (timeC >= 0 && timeC <= 4) {
          observer.next("night");
        }
      } else if (timeB === "pm") {
        if (timeC >= 12) {
          observer.next("afternoon");
        } else if (timeC >= 1 && timeC <= 3) {
          observer.next("afternoon");
        } else if (timeC >= 4 && timeC <= 6) {
          observer.next("evening");
        } else if (timeC >= 7 && timeC <= 11) {
          observer.next("night");
        }
      }
    });
    return observable;
  }

  ionViewDidLoad() {}

  showPopover(event) {
    this.popoverCtrl.create(PopoverPage).present({
      ev: event
    });
  }

  getUserDetails() {
    this.authService
      .getUserDetails()
      .then((res: any) => {
        this.displayPic = res.profilephoto;
        this.name = res.displayName;
      })
      .catch(err => {
        this.toastCtrl
          .create({
            message: "There was an error. Please try again",
            position: "top",
            duration: 2000,
            cssClass: "fail-toast"
          })
          .present();
        console.error(err);
      });
  }

  getWatchlist() {
    this.movieService.getWatchlist().subscribe(
      res => {
        if (res != null) {
          this.watchlist = Object.keys(res).map(i => res[i]);
        }
      },
      err => {
        this.toastCtrl
          .create({
            message: "There was an error. Please try again",
            position: "top",
            duration: 2000,
            cssClass: "fail-toast"
          })
          .present();
        console.error(err);
      }
    );
  }

  getFavourites() {
    this.movieService.getFavourites().subscribe(
      res => {
        this.favourites = Object.keys(res).map(i => res[i]);
      },
      err => {
        this.toastCtrl
          .create({
            message: "There was an error. Please try again",
            position: "top",
            duration: 2000,
            cssClass: "fail-toast"
          })
          .present();
        console.error(err);
      }
    );
  }

  openDetails(film) {
    if (film.type === "movie") {
      this.navCtrl.push("ViewMoviePage", { film: film });
    } else if (film.type === "tv") {
      this.navCtrl.push("ViewShowPage", { film: film });
    }
  }

  logout() {
    this.authService.logout();
    this.navCtrl.setRoot("StartPage");
  }
}
