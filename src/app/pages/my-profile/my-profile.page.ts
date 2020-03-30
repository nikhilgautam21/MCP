import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  user: any;

  constructor(public utils:UtilityService) { 
    this.user = JSON.parse(this.utils.getUserInfo());
  }

  ngOnInit() {
  }


}
