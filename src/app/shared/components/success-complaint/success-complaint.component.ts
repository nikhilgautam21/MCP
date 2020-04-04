import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-success-complaint',
  templateUrl: './success-complaint.component.html',
  styleUrls: ['./success-complaint.component.scss'],
})
export class SuccessComplaintComponent implements OnInit {
  complaintId: any;

  constructor(
    public router: Router,
    private popoverController: PopoverController,
    public navParams: NavParams
  ) {
    this.complaintId = this.navParams.get("complaintId")
  }

  ngOnInit() { }

  goToComplaint() {
    this.dismissPopover();
    this.router.navigate(['/complaint-listing'],{ replaceUrl: true })
  }

  async dismissPopover() {
    await this.popoverController.dismiss();
  }

}
