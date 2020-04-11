import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComplaintDetailPageRoutingModule } from './complaint-detail-routing.module';

import { ComplaintDetailPage } from './complaint-detail.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComplaintDetailPageRoutingModule,
    TranslateModule
  ],
  declarations: [ComplaintDetailPage]
})
export class ComplaintDetailPageModule {}
