import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-image',
  templateUrl: './full-image.page.html',
  styleUrls: ['./full-image.page.scss'],
})
export class FullImagePage implements OnInit {
  image: any;

  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.image = params["imageUrl"]
    })
   }

  ngOnInit() {
  }

}
