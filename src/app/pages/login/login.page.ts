import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoginService } from '../../services/login.service'
import { Router } from '@angular/router';
import { debug } from 'util';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  googleData: any;
  constructor(
    public googlePlus: GooglePlus,
    public loginService: LoginService,
    public router: Router,
    public utils:UtilityService
  ) { }

  ngOnInit() {
  }

  login() {
    // this.loginService.login("k").subscribe(res => {
    //   this.loginService.userData = res;
    // }, err => {
    //   this.loginService.userData = [{ id: "37483llsgks", name: "Nikhil Gautam", email: "nikhil@yahoo.com" }]
    //   localStorage.setItem("user", JSON.stringify(this.loginService.userData))
    //   this.router.navigate(['/home'],{ replaceUrl: true })
    // })

    //Google Sign in

    this.googlePlus.login({})
      .then(res => {
        this.googleData = res;
        this.loginService.login({ "googletoken": this.googleData.accessToken }).subscribe(resp => {
          if(resp !={}){
            this.loginService.userData = resp.user
          localStorage.setItem("x-auth-token", resp["x-auth-token"] )
          localStorage.setItem("user", JSON.stringify(resp["user"]) )
          this.router.navigate(['/home'],{ replaceUrl: true })
          }
          else{
            this.utils.showToast("There was some problem in login. Please try again")
          }
        }, err => {
        })
    
      })
      .catch(err => console.error(err));
  }

}
