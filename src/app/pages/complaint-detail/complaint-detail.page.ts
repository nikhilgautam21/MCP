import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-complaint-detail',
  templateUrl: './complaint-detail.page.html',
  styleUrls: ['./complaint-detail.page.scss'],
})
export class ComplaintDetailPage implements OnInit {

  complaint: any
  constructor(
    public route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.complaint = JSON.parse(params["data"])
    })
  }

  ngOnInit() {
  }

}
