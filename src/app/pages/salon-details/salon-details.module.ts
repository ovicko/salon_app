import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalonDetailsPageRoutingModule } from './salon-details-routing.module';

import { SalonDetailsPage } from './salon-details.page';
import { StarRatingModule } from "ionic5-star-rating";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarRatingModule,
    SalonDetailsPageRoutingModule
  ],
  declarations: [SalonDetailsPage]
})
export class SalonDetailsPageModule {}
