import { Component } from "@angular/core";
import { ViewController, NavController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="settings()">Settings</button>
      <button ion-item (click)="logout()">Logout</button>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private authService: AuthProvider
  ) {}

  settings() {
    this.navCtrl.push("SettingsPage");
  }

  logout() {
    this.viewCtrl.dismiss();
    this.authService.logout();
    this.navCtrl.setRoot("LoginPage");
  }
}
