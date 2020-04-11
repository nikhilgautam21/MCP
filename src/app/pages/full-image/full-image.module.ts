import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FullImagePageRoutingModule } from './full-image-routing.module';

import { FullImagePage } from './full-image.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullImagePageRoutingModule,
    TranslateModule
  ],
  declarations: [FullImagePage]
})
export class FullImagePageModule {}
