import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { UtilityService } from './services/utility.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public utils: UtilityService,
    public router: Router,
    public translate: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.translate.setDefaultLang('hindi')
      if (this.utils.getUserInfo()) {
        this.router.navigate(['/home'])
      } else {
        this.router.navigate(['/login'])
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
