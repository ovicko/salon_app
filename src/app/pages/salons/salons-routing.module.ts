import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalonsPage } from './salons.page';

const routes: Routes = [
  {
    path: '',
    component: SalonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalonsPageRoutingModule {}
