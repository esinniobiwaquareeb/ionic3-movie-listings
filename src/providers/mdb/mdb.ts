import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import firebase from "firebase";
import { Storage } from "@ionic/storage";
import { AuthProvider } from "../auth/auth";
import { UrlSerializer } from "ionic-angular";

/*
  Generated class for the MdbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MdbProvider {
    apikey = "437ec14915e2215d5cbe506bbe6b217e";
    movies: any;
    nowplayingmovies: any;
    upcomingmovies: any;
    topratedfilms: any;
    tvshows: any;
    topratedtvshows: any;
    showingtodaytvshows: any;
    film: any;
    filmcast: any;
    page = 0;
    maximumPages = 4;
    similar: any;
    episodes: any;
    uid: any = null;
    watchlist = firebase.database().ref("/watchlist");
    favourites = firebase.database().ref("/favourites");
    reviews = firebase.database().ref("/reviews");

    test: any;
    month: any;

    constructor(
        public http: HttpClient,
        private storage: Storage,
        private authService: AuthProvider
    ) {
        this.storage
            .get("user")
            .then(res => {
                this.uid = res;
            })
            .catch(err => {
                console.error(err);
            });
    }

    getMovies(page) {
        return new Promise(resolve => {
            this.http
                .get(
                    "https://api.themoviedb.org/3/discover/movie?page=" +
                        page +
                        "&include_video=true&include_adult=true&sort_by=popularity.desc&language=en-US&api_key=" +
                        this.apikey +
                        ""
                )
                .subscribe(
                    data => {
                        this.movies = data;
                        resolve(this.movies);
                    },
                    err => {
                        console.error(err);
                    }
                );
        });
    }

    getCinemaMovies(page) {
        return new Promise(resolve => {
            this.http
                .get(
                    "https://api.themoviedb.org/3/movie/now_playing?page=" +
                        page +
                        "&language=en-US&api_key=" +
                        this.apikey +
                        ""
                )
                .subscribe(data => {
                    this.nowplayingmovies = data;
                    resolve(this.nowplayingmovies);
                });
        });
    }

    getUpcomingMovies(page) {
        return new Promise(resolve => {
            this.http
                .get(
                    "https://api.themoviedb.org/3/movie/upcoming?page=" +
                        page +
                        "&language=en-US&api_key=" +
                        this.apikey +
                        ""
                )
                .subscribe(data => {
                    this.upcomingmovies = data;
                    resolve(this.upcomingmovies);
                });
        });
    }

    getTopRatedMovies(page) {
        return new Promise(resolve => {
            this.http
                .get(
                    "https://api.themoviedb.org/3/movie/top_rated?page=" +
                        page +
                        "&language=en-US&api_key=" +
                        this.apikey +
                        ""
                )
                .subscribe(data => {
                    this.topratedfilms = data;
                    resolve(this.topratedfilms);
                });
        });
    }

    gettvShows(page) {
        return new Promise(resolve => {
            this.http
                .get(
                    "https://api.themoviedb.org/3/discover/tv?include_null_first_air_dates=true&page=" +
                        page +
                        "&sort_by=popularity.desc&language=en-US&api_key=" +
                        this.apikey +
                        ""
                )
                .subscribe(data => {
                    this.tvshows = data;
                    resolve(this.tvshows);
                });
        });
    }

    gettopratedtvShows(page) {
        return new Promise(resolve => {
            this.http
                .get(
                    "https://api.themoviedb.org/3/tv/top_rated?page=" +
                        page +
                        "&language=en-US&api_key=" +
                        this.apikey +
                        ""
                )
                .subscribe(data => {
                    this.topratedtvshows = data;
                    resolve(this.topratedtvshows);
                });
        });
    }

    getTodaytvShows(page) {
        return new Promise(resolve => {
            this.http
                .get(
                    "https://api.themoviedb.org/3/tv/airing_today?page=" +
                        page +
                        "&language=en-US&api_key=" +
                        this.apikey +
                        ""
                )
                .subscribe(data => {
                    this.showingtodaytvshows = data;
                    resolve(this.showingtodaytvshows);
                });
        });
    }

    getFilmDetails(id) {
        let filmid = id;

        return new Promise(resolve => {
            this.http
                .get(
                    "https://api.themoviedb.org/3/movie/" +
                        filmid +
                        "?language=en-US&api_key=" +
                        this.apikey +
                        ""
                )
                .subscribe(data => {
                    this.film = data;
                    resolve(this.film);
                });
        });
    }

    getFilmCast(type, id) {
        let filmid = id;

        return new Promise(resolve => {
            this.http
                .get(
                    "https://api.themoviedb.org/3/" +
                        type +
                        "/" +
                        filmid +
                        "/credits?api_key=" +
                        this.apikey +
                        ""
                )
                .subscribe(data => {
                    this.filmcast = data;
                    resolve(this.filmcast);
                });
        });
    }

    getSimilar(type, id) {
        let filmid = id;

        return new Promise(resolve => {
            this.http
                .get(
                    "https://api.themoviedb.org/3/" +
                        type +
                        "/" +
                        filmid +
                        "/similar?api_key=" +
                        this.apikey +
                        "&language=en-US&page=1"
                )
                .subscribe(data => {
                    this.similar = data;
                    resolve(this.similar);
                });
        });
    }

    getEpisodes(ssn, id) {
        let filmid = id;

        return new Promise(resolve => {
            this.http
                .get(
                    "https://api.themoviedb.org/3/tv/" +
                        filmid +
                        "/season/" +
                        ssn +
                        "?api_key=" +
                        this.apikey +
                        "&language=en-US"
                )
                .subscribe(data => {
                    this.episodes = data;
                    resolve(this.episodes);
                });
        });
    }

    searchAll(query, page) {
        return new Promise(resolve => {
            this.http
                .get(
                    "https://api.themoviedb.org/3/search/multi?include_adult=true&page=" +
                        page +
                        "&query=" +
                        query +
                        "&language=en-US&api_key=" +
                        this.apikey +
                        ""
                )
                .subscribe(data => {
                    resolve(data);
                });
        });
    }

    searchMovies(query, page) {
        return new Promise(resolve => {
            this.http
                .get(
                    "https://api.themoviedb.org/3/search/movie?include_adult=true&page=" +
                        page +
                        "&query=" +
                        query +
                        "&language=en-US&api_key=" +
                        this.apikey +
                        ""
                )
                .subscribe(data => {
                    resolve(data);
                });
        });
    }

    searchShows(query, page) {
        return new Promise(resolve => {
            this.http
                .get(
                    "https://api.themoviedb.org/3/search/tv?page=" +
                        page +
                        "&query=" +
                        query +
                        "&language=en-US&api_key=" +
                        this.apikey +
                        ""
                )
                .subscribe(data => {
                    resolve(data);
                });
        });
    }

    searchPeople(query, page) {
        return new Promise(resolve => {
            this.http
                .get(
                    "https://api.themoviedb.org/3/search/person?include_adult=true&page=" +
                        page +
                        "&query=" +
                        query +
                        "&language=en-US&api_key=" +
                        this.apikey +
                        ""
                )
                .subscribe(data => {
                    resolve(data);
                });
        });
    }

    getActorMovies(id) {
        return new Promise(resolve => {
            this.http
                .get(
                    "https://api.themoviedb.org/3/person/" +
                        id +
                        "/movie_credits?language=en-US&api_key=" +
                        this.apikey +
                        ""
                )
                .subscribe(data => {
                    resolve(data);
                });
        });
    }

    getActorShows(id) {
        return new Promise(resolve => {
            this.http
                .get(
                    "https://api.themoviedb.org/3/person/" +
                        id +
                        "/tv_credits?language=en-US&api_key=" +
                        this.apikey +
                        ""
                )
                .subscribe(data => {
                    resolve(data);
                });
        });
    }

    addToWatchlist(fid, type, name, poster_path) {
        return new Promise(resolve => {
            this.watchlist.child(this.uid).once("value", snapshot => {
                if (snapshot.child(fid).val()) {
                    this.watchlist
                        .child(this.uid)
                        .child(fid)
                        .remove()
                        .then(res => {
                            resolve("found");
                        })
                        .catch(err => {
                            console.error(err);
                        });
                } else {
                    this.watchlist
                        .child(this.uid)
                        .child(fid)
                        .set({
                            id: fid,
                            type: type,
                            name: name,
                            poster_path: poster_path
                        })
                        .then(res => {
                            resolve(true);
                        })
                        .catch(err => {
                            console.error(err);
                            resolve(false);
                        });
                }
            });
        });
    }

    addReview(id, review) {
        return new Promise(resolve => {
            this.authService
                .getUserDetails()
                .then((res: any) => {
                    this.reviews
                        .child(id)
                        .push({
                            review: review,
                            by: res.displayName,
                            uid: res.uid,
                            photo: res.profilephoto,
                            addedon: Date(),
                            upvotes: 0,
                            downvotes: 0
                        })
                        .then(
                            res => {
                                resolve(true);
                            },
                            err => {
                                resolve(false);
                                console.error(err);
                            }
                        );
                })
                .catch(err => {
                    resolve(false);
                    console.error(err);
                });
        });
    }

    getReviews(id) {
        let observable = new Observable(observer => {
            this.reviews
                .child(id)
                .orderByKey()
                .on(
                    "value",
                    snapshot => {
                        observer.next(snapshot.toJSON());
                    },
                    err => {
                        console.error(err);
                    }
                );
        });
        return observable;
    }

    addToFavourites(fid, type, name, poster_path) {
        return new Promise(resolve => {
            this.favourites.child(this.uid).once("value", snapshot => {
                if (snapshot.child(fid).val()) {
                    this.favourites
                        .child(this.uid)
                        .child(fid)
                        .remove()
                        .then(res => {
                            resolve("found");
                        })
                        .catch(err => {
                            console.error(err);
                        });
                } else {
                    this.favourites
                        .child(this.uid)
                        .child(fid)
                        .set({
                            id: fid,
                            type: type,
                            name: name,
                            poster_path: poster_path
                        })
                        .then(res => {
                            resolve(true);
                        })
                        .catch(err => {
                            console.error(err);
                            resolve(false);
                        });
                }
            });
        });
    }

    checkWatchlist(fid) {
        return new Promise(resolve => {
            this.watchlist
                .child(this.uid)
                .once("value", snapshot => {
                    if (snapshot.child(fid).val()) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(err => {
                    console.error(err);
                    resolve("error");
                });
        });
    }

    getWatchlist() {
        let observable = new Observable(observer => {
            this.watchlist.child(this.uid).on(
                "value",
                snapshot => {
                    observer.next(snapshot.toJSON());
                },
                err => {
                    console.error(err);
                }
            );
        });
        return observable;
    }

    getFavourites() {
        let observable = new Observable(observer => {
            this.favourites.child(this.uid).on(
                "value",
                snapshot => {
                    observer.next(snapshot.toJSON());
                },
                err => {
                    console.error(err);
                }
            );
        });
        return observable;
    }

    checkFavourites(fid) {
        return new Promise(resolve => {
            this.favourites
                .child(this.uid)
                .once("value", snapshot => {
                    if (snapshot.child(fid).val()) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(err => {
                    console.error(err);
                    resolve("error");
                });
        });
    }
}
