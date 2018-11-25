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
 * Generated class for the ViewShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-view-show",
  templateUrl: "view-show.html"
})
export class ViewShowPage {
  somethingloading: any = null;
  watched: any = null;
  liked: any = null;
  movieinfosegment = "info";
  overview: any;
  website: any;
  title: any;
  genres: any;
  poster: any;
  backdrop: any;
  productioncompanies: any;
  networks: any;
  numberofseasons: any;
  numberofepisodes: any;
  seasons: any;
  reviews: any;
  episodes: any;
  firstairdate: any;
  lastairdate: any;
  runtime: any;
  status: any;
  createdby: any;
  id: any;
  cast: any;
  similarshows: any;
  type = "tv";
  information: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public movieService: MdbProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {
    this.id = this.navParams.get("film").id;
    this.loadFilmDetails();
    this.loadCast();
    this.loadSimilarShows();
    this.loadReviews();
  }

  ionViewDidLoad() {}

  loadFilmDetails() {
    this.somethingloading = true;
    this.http
      .get(
        "https://api.themoviedb.org/3/tv/" +
          this.id +
          "?language=en-US&api_key=4d51e2149ffec1e3fabb84a54d724b76"
      )
      .subscribe((data: any) => {
        this.overview = data.overview;
        this.website = data.homepage;
        this.genres = data.genres;
        this.poster = "https://image.tmdb.org/t/p/original" + data.poster_path;
        this.backdrop = data.backdrop_path;
        this.productioncompanies = data.production_companies;
        this.firstairdate = "First Air Date " + data.first_air_date;
        this.runtime = data.episode_run_time + " Minutes";
        this.status = data.status;
        this.title = data.name;
        this.lastairdate = "First Air Date " + data.last_air_date;
        this.networks = data.networks;
        this.numberofepisodes = data.number_of_episodes;
        this.numberofseasons = data.number_of_seasons;
        this.seasons = data.seasons;
        this.createdby = data.created_by;
        this.somethingloading = null;
      });
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

  loadSimilarShows() {
    this.movieService
      .getSimilar(this.type, this.id)
      .then((similar: any) => {
        this.similarshows = similar.results;
      })
      .catch(err => {
        console.error(err);
      });
  }

  toggleSection(season, i) {
    this.movieService
      .getEpisodes(season.season_number, this.id)
      .then((episode: any) => {
        this.episodes = episode.episodes;
      })
      .catch(err => {
        console.error(err);
      });
    this.seasons[i].open = !this.seasons[i].open;
  }

  toggleItem(i, j) {
    this.episodes[j].open = !this.episodes[j].open;
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
              message: "Added " + this.title + " to watchlist",
              duration: 1000,
              position: "top",
              cssClass: "add-toast"
            })
            .present();
        } else if (res === "found") {
          this.watched = null;
          this.toastCtrl
            .create({
              message: "Removed " + this.title + " from Watchlist",
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

  openDetails(serie) {
    this.navCtrl.push("ViewShowPage", { film: serie });
  }

  openActor(actor) {
    this.navCtrl.push("ViewActorPage", { actor: actor });
  }
}
