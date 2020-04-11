import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddComplaintPageRoutingModule } from './add-complaint-routing.module';
import { AddComplaintPage } from './add-complaint.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SuccessComplaintComponent } from 'src/app/shared/components/success-complaint/success-complaint.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddComplaintPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [AddComplaintPage],
  entryComponents:[SuccessComplaintComponent]
})
export class AddComplaintPageModule {}
