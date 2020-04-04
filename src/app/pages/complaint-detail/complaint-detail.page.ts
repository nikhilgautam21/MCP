import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import STATUS from "../../constants/status.json";

@Component({
  selector: 'app-complaint-detail',
  templateUrl: './complaint-detail.page.html',
  styleUrls: ['./complaint-detail.page.scss'],
})
export class ComplaintDetailPage implements OnInit {

  complaint: any;
  timer:any = 1;
  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.complaint = JSON.parse(params["data"])
    })
  }

  ngOnInit() {
    this.counter();
  }

  counter(){
    setTimeout(()=>{
      if(this.timer != 0){
        this.timer = this.timer - 1
        this.counter()
      }
    },1000)
  }

  showFullImage(url){
    let naivgationExtra: NavigationExtras ={
      queryParams :{
        imageUrl: url
      }
    }
    this.router.navigate(["/full-image"],naivgationExtra)
  }

}
