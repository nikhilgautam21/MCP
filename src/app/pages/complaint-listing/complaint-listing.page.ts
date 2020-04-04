import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, NavigationStart } from '@angular/router';
import { ComplaintService } from 'src/app/services/complaint.service.js';
import STATUS from "../../constants/status.json";

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
      this.complaints.forEach(item=>{
        item["status"] = STATUS[item["status"]]
      })
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
