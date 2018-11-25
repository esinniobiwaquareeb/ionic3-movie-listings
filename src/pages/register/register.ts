import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  LoadingController
} from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  name: any;
  username: any;
  email: any;
  password: any;
  passwordconfirm: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {}

  emailRegister() {
    var loader = this.loadingCtrl.create({
      spinner: "dots",
      content: "Creating Account"
    });
    loader.present();
    this.authService
      .registerWithEmail(this.email, this.password, this.name, this.username)
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
          this.navCtrl.setRoot("LoginPage");
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

  googleRegister() {
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

  facebookRegister() {
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

  openLogin() {
    this.navCtrl.push("LoginPage");
  }

}
