import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { MdbProvider } from "../../providers/mdb/mdb";

/**
 * Generated class for the ExplorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-explore",
  templateUrl: "explore.html"
})
export class ExplorePage {
  resultssegment = "all";
  allresults: any;
  movies: any;
  shows: any;
  people: any;
  query: any;
  page = "1";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public movieService: MdbProvider,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {}

  getResults(ev: any) {
    this.query = ev.target.value;

    this.search();
  }

  search() {
    this.movieService
      .searchAll(this.query, this.page)
      .then((data: any) => {
        this.allresults = data.results;
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

    this.movieService
      .searchMovies(this.query, this.page)
      .then((data: any) => {
        this.movies = data.results;
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

    this.movieService
      .searchShows(this.query, this.page)
      .then((data: any) => {
        this.shows = data.results;
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

    this.movieService
      .searchPeople(this.query, this.page)
      .then((data: any) => {
        this.people = data.results;
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

  openResult(result) {
    if (result.media_type === "movie") {
      this.navCtrl.push("ViewMoviePage", { film: result });
    } else if (result.media_type === "tv") {
      this.navCtrl.push("ViewShowPage", { film: result });
    } else if (result.media_type === "person") {
      this.navCtrl.push("ViewActorPage", { actor: result });
    }
  }

  openMovie(movie) {
    this.navCtrl.push("ViewMoviePage", { film: movie });
  }

  openShow(show) {
    this.navCtrl.push("ViewShowPage", { film: show });
  }

  openActor(actor) {
    this.navCtrl.push("ViewActorPage", { actor: actor });
  }
}
