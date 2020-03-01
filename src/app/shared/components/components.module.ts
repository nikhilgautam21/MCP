import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessComplaintComponent } from './success-complaint/success-complaint.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    SuccessComplaintComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    SuccessComplaintComponent
  ]
})
export class ComponentsModule { }
