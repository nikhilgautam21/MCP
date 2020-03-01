import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-success-complaint',
  templateUrl: './success-complaint.component.html',
  styleUrls: ['./success-complaint.component.scss'],
})
export class SuccessComplaintComponent implements OnInit {

  constructor(
    public router: Router,
    private popoverController: PopoverController
  ) { }

  ngOnInit() { }

  goToComplaint() {
    this.dismissPopover();
    this.router.navigate(['/home'])
  }

  async dismissPopover() {
    await this.popoverController.dismiss();
  }

}
