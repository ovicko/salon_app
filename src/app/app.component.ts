import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: 'home',
      icon: 'home'
    },

    {
      title: 'Nearby Salons',
      url: '/salons',
      icon: 'pin'
    },

    {
      title: 'Bookings',
      url: '/booking',
      icon: 'calendar'
    },

    {
      title: 'Account',
      url: '/account',
      icon: 'person'
    }
  ];

  constructor(
    private platform: Platform,
    //private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      SplashScreen.hide();
      this.statusBar.styleBlackTranslucent();
      this.authService.getToken();
      // this.authService.getUserId();
    });
  }
}
