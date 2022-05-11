import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowdataPageRoutingModule } from './showdata-routing.module';

import { ShowdataPage } from './showdata.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowdataPageRoutingModule
  ],
  declarations: [ShowdataPage]
})
export class ShowdataPageModule {}
