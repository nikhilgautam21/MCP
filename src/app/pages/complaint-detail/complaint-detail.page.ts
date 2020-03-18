import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-complaint-detail',
  templateUrl: './complaint-detail.page.html',
  styleUrls: ['./complaint-detail.page.scss'],
})
export class ComplaintDetailPage implements OnInit {

  complaint: any
  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.complaint = JSON.parse(params["data"])
    })
  }

  ngOnInit() {
  }

  showFullImage(){
    debugger
    let naivgationExtra: NavigationExtras ={
      queryParams :{
        imageUrl: "https://image.shutterstock.com/image-photo/shy-female-possum-grass-260nw-529158298.jpg"
      }
    }
    this.router.navigate(["/full-image"],naivgationExtra)
  }

}
