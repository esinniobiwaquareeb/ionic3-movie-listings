//THESE ARE THE NEEDED IMPORTS FOR THIS PAGE
import { Component, ViewChild } from "@angular/core";
import { Nav, Platform, ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { StatusBar } from "@ionic-native/status-bar";
import { Keyboard } from "@ionic-native/keyboard";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ImageLoaderConfig } from "ionic-image-loader";
import { BackgroundMode } from "@ionic-native/background-mode";
import { Network } from "@ionic-native/network";
import { config } from "./app.firebase";
import firebase from "firebase";
import { AppState } from "./app.global";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  state: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private imageLoaderConfig: ImageLoaderConfig,
    private storage: Storage,
    private keyboard: Keyboard,
    public backgroundMode: BackgroundMode,
    private network: Network,
    public toastCtrl: ToastController,
    public global: AppState
  ) {
    //INITIALIZES FIREBASE WITH THE APP
    firebase.initializeApp(config);

    //SETS STATUS BAR STYLE
    this.statusBar.styleDefault();

    //INITIALIZES THE APP
    this.initializeApp();

    //CHECKS WHETHER A USER IS ALREADY LOGGED IN, ELSE REDIRECTS TO LOGIN PAGE
    this.storage
      .get("user")
      .then(val => {
        if (val) {
          this.rootPage = "TabsPage";
        } else {
          this.rootPage = "LoginPage";
        }
      })
      .catch(err => {
        this.rootPage = "LoginPage";
        console.error(err);
      });

    //KEEPS CHECKING NETWORK CONNECTIVITY AND ALERTS USER IF DISCONNECTED
    this.network.onchange().subscribe(networkchange => {
      if (networkchange.type === "online") {
        this.toastCtrl
          .create({
            message: "Back Online",
            duration: 2000,
            position: "top",
            cssClass: "toastonline"
          })
          .present();
      } else if (networkchange.type === "offline") {
        this.toastCtrl
          .create({
            message: "You Seem To Be Offline",
            duration: 2000,
            position: "top",
            cssClass: "toastoffline"
          })
          .present();
      }
    });
  }

  //INITIALIZE THE APP
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.storage
        .get("theme")
        .then(res => {
          if (res) {
            this.global.set("theme", res);
          } else {
            this.global.set("theme", "theme-dark");
          }
        })
        .catch(err => {
          console.log(err);
          this.global.set("theme", "theme-dark");
        });

      //CONFIGURATION FOR THE IMAGE LOADER PLUGIN
      this.imageLoaderConfig.enableDebugMode();
      //sets a fallback image as the placeholder while it loads, else defaults to a spinner
      this.imageLoaderConfig.enableFallbackAsPlaceholder(true);
      //sets how long images will be cached
      this.imageLoaderConfig.setMaximumCacheAge(28 * 24 * 60 * 60 * 1000); // 28 days
      this.imageLoaderConfig.setConcurrency(10);
      //uses <img> tag
      this.imageLoaderConfig.useImageTag(true);
      //sets the name for the cache directory
      this.imageLoaderConfig.setCacheDirectoryName("PMDBImgsCache");
      //sets size of the cache directory
      this.imageLoaderConfig.setMaximumCacheSize(50 * 1024 * 1024); //50MB
      //sets the fallback image to use
      this.imageLoaderConfig.setFallbackUrl("./assets/imgs/fallback.png");
      this.imageLoaderConfig.enableSpinner(true);

      //allows the app to run in background silently
      this.backgroundMode.enable();
      this.backgroundMode.setDefaults({
        silent: true
      });
      this.keyboard.disableScroll(true);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
