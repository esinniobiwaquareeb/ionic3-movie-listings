import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  AlertController
} from "ionic-angular";
import { AppState } from "../../app/app.global";
import { Storage } from "@ionic/storage";
import { ImageLoader } from "ionic-image-loader";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: AppState,
    private storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public imageLoader: ImageLoader
  ) {}

  ionViewDidLoad() {}

  /* changeTheme(theme) {
    this.global.set("theme", theme);
  } */
  changeTheme() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Change App Theme",
      buttons: [
        {
          text: "Light Theme",
          handler: () => {
            this.storage.set("theme", "theme-light").then(res => {
              this.global.set("theme", res);
            });
          }
        },
        {
          text: "Dark Theme",
          handler: () => {
            this.storage.set("theme", "theme-dark").then(res => {
              this.global.set("theme", res);
            });
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });

    actionSheet.present();
  }

  clearCache() {
    let alert = this.alertCtrl.create({
      title: "Clear Cache?",
      message: "This Will Clear Any Saved Images",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Clear",
          handler: () => {
            this.imageLoader.clearCache();
          }
        }
      ]
    });
    alert.present();
  }
}
