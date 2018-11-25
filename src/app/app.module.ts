import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from "@ionic/storage";
import { BackgroundMode } from "@ionic-native/background-mode";
import { Keyboard } from "@ionic-native/keyboard";
import { Network } from "@ionic-native/network";
import { GooglePlus } from "@ionic-native/google-plus";
import { SQLite } from "@ionic-native/sqlite";
import { Facebook } from "@ionic-native/facebook";
import { MyApp } from "./app.component";
import { AdMobFree } from '@ionic-native/admob-free';

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { MdbProvider } from "../providers/mdb/mdb";
import { AuthProvider } from "../providers/auth/auth";
import { IonicImageLoader } from "ionic-image-loader";
import { HttpClientModule } from "@angular/common/http";
import { NativePageTransitions } from "@ionic-native/native-page-transitions";
import { AppState } from "./app.global";
import { PopoverPage } from "../pages/profile/popover";

@NgModule({
    declarations: [MyApp, PopoverPage],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            scrollAssist: false,
            autoFocusAssist: false,
            tabsHideOnSubPages: true
        }),
        HttpModule,
        HttpClientModule,
        IonicImageLoader.forRoot(),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [MyApp, PopoverPage],
    providers: [
        Network,
        Keyboard,
        BackgroundMode,
        StatusBar,
        SplashScreen,
        AdMobFree,
        NativePageTransitions,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        MdbProvider,
        AuthProvider,
        GooglePlus,
        SQLite,
        Facebook,
        AppState
    ]
})
export class AppModule {}
