import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, NavigationStart } from '@angular/router';
import { ComplaintService } from 'src/app/services/complaint.service.js';
@Component({
  selector: 'app-complaint-listing',
  templateUrl: './complaint-listing.page.html',
  styleUrls: ['./complaint-listing.page.scss'],
})
export class ComplaintListingPage implements OnInit {

  complaints:any
  constructor(
    public router: Router,
    public complaintService: ComplaintService
  ) { }

  ngOnInit() {
    this.getAllComplaints();
  }

  getAllComplaints(){
    this.complaintService.getAllComplaints().subscribe(res=>{
      this.complaints = res;
    })
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
