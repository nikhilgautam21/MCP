import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComplaintListingPageRoutingModule } from './complaint-listing-routing.module';

import { ComplaintListingPage } from './complaint-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComplaintListingPageRoutingModule
  ],
  declarations: [ComplaintListingPage]
})
export class ComplaintListingPageModule {}
