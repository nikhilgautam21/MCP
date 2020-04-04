import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  user: any;

  constructor(
    public utils: UtilityService,
    public router: Router,
    private googleplus: GooglePlus
    ) {
    this.user = JSON.parse(this.utils.getUserInfo());
  }

  ngOnInit() {
  }

  logout(){
    this.utils.showAlert().then(()=>{
      localStorage.removeItem("x-auth-token")
      localStorage.removeItem("user")
      localStorage.removeItem(" advancedHttpCookieStore__")
      this.googleplus.logout().then(()=>{
        this.router.navigate(['/login'])
      })
    }).catch(()=>{

    })
  }


}
