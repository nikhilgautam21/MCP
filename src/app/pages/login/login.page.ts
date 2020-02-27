import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  googleData:any;
  constructor(
    public googlePlus:GooglePlus
  ) { }

  ngOnInit() {
  }

  login() {
    this.googlePlus.login({})
      .then(res => {
        this.googleData = res;
        //accessToken
      })
      .catch(err => console.error(err));
  }

}
