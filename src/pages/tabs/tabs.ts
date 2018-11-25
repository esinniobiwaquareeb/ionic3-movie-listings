import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AppState } from "../../app/app.global";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root: string = "MoviesPage";
  tab2Root: string = "ExplorePage";
  tab3Root: string = "NotificationsPage";
  tab4Root: string = "ProfilePage";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private global: AppState
  ) {}

  ionViewDidLoad() {}
  ionViewWillLoad() {
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
  }
}
