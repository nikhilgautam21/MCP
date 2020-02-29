import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddComplaintPageRoutingModule } from './add-complaint-routing.module';
import { AddComplaintPage } from './add-complaint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddComplaintPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddComplaintPage]
})
export class AddComplaintPageModule {}
