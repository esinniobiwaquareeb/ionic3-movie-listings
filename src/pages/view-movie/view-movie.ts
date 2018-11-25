import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  AlertController
} from "ionic-angular";
import { MdbProvider } from "../../providers/mdb/mdb";
import { HttpClient } from "@angular/common/http";

/**
 * Generated class for the ViewMoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-view-movie",
  templateUrl: "view-movie.html"
})
export class ViewMoviePage {
  somethingloading: any = null;
  watched: any = null;
  liked: any = null;
  movieinfosegment = "info";
  overview: any;
  website: any;
  budget: any;
  title: any;
  genres: any;
  poster: any;
  backdrop: any;
  productioncompanies: any;
  releasedate: any;
  runtime: any;
  status: any;
  tagline: any;
  id: any;
  cast: any;
  reviews: any;
  similarmovies: any;
  type = "movie";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public movieService: MdbProvider,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {
    this.id = this.navParams.get("film").id;
    this.loadReviews();
    this.checkWatchlist();
    this.checkFavourites();
    this.loadFilmDetails();
    this.loadCast();
    this.loadSimilarMovies();
  }

  ionViewDidLoad() {}

  ionViewDidLeave() {
    this.id = "";
  }

  openReviewBox() {
    let alert = this.alertCtrl.create({
      title: "Add Review",
      cssClass: "reviewPrompt",
      inputs: [
        {
          name: "review",
          placeholder: "Enter Review"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Add",
          handler: data => {
            this.somethingloading = true;
            this.movieService
              .addReview(this.id, data.review)
              .then(res => {
                this.somethingloading = null;
                if (res === true) {
                  this.movieinfosegment = "review";
                } else {
                }
              })
              .catch(err => {
                this.somethingloading = null;
                console.error(err);
              });
          }
        }
      ]
    });
    alert.present();
  }

  loadReviews() {
    this.movieService.getReviews(this.id).subscribe(
      res => {
        if (res === null) {
        } else {
          let unsortedreviews = Object.keys(res).map(i => res[i]);
          this.reviews = unsortedreviews.reverse();
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  loadFilmDetails() {
    this.somethingloading = true;
    this.http
      .get(
        "https://api.themoviedb.org/3/movie/" +
          this.id +
          "?language=en-US&api_key=4d51e2149ffec1e3fabb84a54d724b76"
      )
      .subscribe((data: any) => {
        this.overview = data.overview;
        this.website = data.homepage;
        this.budget = "budget " + data.budget;
        this.genres = data.genres;
        this.poster = "https://image.tmdb.org/t/p/original" + data.poster_path;
        this.backdrop = data.backdrop_path;
        this.productioncompanies = data.production_companies;
        this.releasedate = "Release Date " + data.release_date;
        this.runtime = data.runtime + " Minutes";
        this.status = data.status;
        this.tagline = data.tagline;
        this.title = data.original_title;
        this.somethingloading = null;
        //this.id = data.id;
      });
  }

  checkWatchlist() {
    this.movieService
      .checkWatchlist(this.id)
      .then(res => {
        if (res === true) {
          this.watched = true;
        } else if (res === false) {
          this.watched = null;
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  checkFavourites() {
    this.movieService
      .checkFavourites(this.id)
      .then(res => {
        if (res === true) {
          this.liked = true;
        } else if (res === false) {
          this.liked = null;
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  addToWatchlist() {
    this.somethingloading = true;
    this.movieService
      .addToWatchlist(this.id, this.type, this.title, this.poster)
      .then(res => {
        this.somethingloading = null;
        if (res === true) {
          this.watched = true;
          this.toastCtrl
            .create({
              message: "Added " + this.title + " to Watchlist",
              duration: 1000,
              position: "top",
              cssClass: "add-toast"
            })
            .present();
        } else if (res === "found") {
          this.watched = null;
          this.toastCtrl
            .create({
              message: "Removed " + this.title + " to Watchlist",
              duration: 1000,
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

  addToFavourites() {
    this.somethingloading = true;
    this.movieService
      .addToFavourites(this.id, this.type, this.title, this.poster)
      .then(res => {
        this.somethingloading = null;
        if (res === true) {
          this.liked = true;
          this.toastCtrl
            .create({
              message: "Added " + this.title + " to Favourites",
              duration: 1000,
              position: "top",
              cssClass: "add-toast"
            })
            .present();
        } else if (res === "found") {
          this.liked = null;
          this.toastCtrl
            .create({
              message: "Removed " + this.title + " from Favourites",
              duration: 1000,
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

  loadCast() {
    this.movieService
      .getFilmCast(this.type, this.id)
      .then((filmcast: any) => {
        this.cast = filmcast.cast;
      })
      .catch(err => {
        console.error(err);
      });
  }

  loadSimilarMovies() {
    this.movieService
      .getSimilar(this.type, this.id)
      .then((similar: any) => {
        this.similarmovies = similar.results;
      })
      .catch(err => {
        console.error(err);
      });
  }

  openDetails(movie) {
    this.navCtrl.push("ViewMoviePage", { film: movie });
  }

  openActor(actor) {
    this.navCtrl.push("ViewActorPage", { actor: actor });
  }
}
