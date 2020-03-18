import { Component, OnInit } from '@angular/core';
import COMPLAINTS from '../../constants/complaints.json'
import { Router, NavigationExtras, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-complaint-listing',
  templateUrl: './complaint-listing.page.html',
  styleUrls: ['./complaint-listing.page.scss'],
})
export class ComplaintListingPage implements OnInit {

  complaints:any = COMPLAINTS.data;
  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  goToDetail(complaint){
    let naivgationExtra: NavigationExtras ={
      queryParams :{
        data: JSON.stringify(complaint)
      }
    }
    this.router.navigate(['/complaint-detail'], naivgationExtra )
  }

}
