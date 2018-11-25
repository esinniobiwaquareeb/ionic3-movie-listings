import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController
} from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  email: any;
  password: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {}

  loginWithEmail() {
    var loader = this.loadingCtrl.create({
      spinner: "dots",
      content: "Logging In"
    });
    loader.present();
    this.authService
      .loginwithEmail(this.email, this.password)
      .then(res => {
        loader.dismiss();
        if (res === true) {
          this.navCtrl.setRoot("TabsPage");
        } else if (res === "verify") {
          this.toastCtrl
            .create({
              message: "Verify your email before logging in",
              position: "top",
              duration: 2000,
              cssClass: "fail-toast"
            })
            .present();
        } else if (res === "password") {
          this.toastCtrl
            .create({
              message: "Please check login details",
              position: "top",
              duration: 2000,
              cssClass: "fail-toast"
            })
            .present();
        } else {
          this.toastCtrl
            .create({
              message: "There was an error. Please try again",
              position: "top",
              duration: 2000,
              cssClass: "fail-toast"
            })
            .present();
        }
      })
      .catch(err => {
        loader.dismiss();
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

  googleLogin() {
    var loader = this.loadingCtrl.create({
      spinner: "dots",
      content: "Logging In"
    });
    loader.present();
    this.authService
      .registerWithGoogle()
      .then(res => {
        if (res === true) {
          loader.dismiss();
          this.navCtrl.setRoot("TabsPage");
        } else if (res === "email") {
          loader.dismiss();
          this.toastCtrl
            .create({
              message: "This Email Already Exists",
              position: "top",
              duration: 2000,
              cssClass: "fail-toast"
            })
            .present();
        } else {
          loader.dismiss();
          this.toastCtrl
            .create({
              message: "Please Try Again",
              position: "top",
              duration: 2000,
              cssClass: "fail-toast"
            })
            .present();
        }
      })
      .catch(err => {
        loader.dismiss();
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

  facebookLogin() {
    var loader = this.loadingCtrl.create({
      spinner: "dots",
      content: "Logging In"
    });
    loader.present();
    this.authService
      .registerWithFacebook()
      .then(res => {
        if (res === true) {
          loader.dismiss();
          this.navCtrl.setRoot("TabsPage");
        } else if (res === "email") {
          loader.dismiss();
          this.toastCtrl
            .create({
              message: "This Email Already Exists",
              position: "top",
              duration: 2000,
              cssClass: "fail-toast"
            })
            .present();
        } else {
          loader.dismiss();
          this.toastCtrl
            .create({
              message: "Please Try Again",
              position: "top",
              duration: 2000,
              cssClass: "fail-toast"
            })
            .present();
        }
      })
      .catch(err => {
        loader.dismiss();
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
  openRegister() {
    this.navCtrl.push("RegisterPage");
  }
  
}
