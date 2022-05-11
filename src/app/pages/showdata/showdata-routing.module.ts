import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowdataPage } from './showdata.page';

const routes: Routes = [
  {
    path: '',
    component: ShowdataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowdataPageRoutingModule {}
