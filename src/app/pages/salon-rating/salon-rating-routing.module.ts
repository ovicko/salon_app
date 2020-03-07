import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalonRatingPage } from './salon-rating.page';

const routes: Routes = [
  {
    path: '',
    component: SalonRatingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalonRatingPageRoutingModule {}
