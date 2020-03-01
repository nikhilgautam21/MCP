import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComplaintListingPage } from './complaint-listing.page';

const routes: Routes = [
  {
    path: '',
    component: ComplaintListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplaintListingPageRoutingModule {}
