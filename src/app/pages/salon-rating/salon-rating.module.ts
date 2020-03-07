import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalonRatingPageRoutingModule } from './salon-rating-routing.module';

import { SalonRatingPage } from './salon-rating.page';
import { StarRatingModule } from 'ionic4-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarRatingModule,
    ReactiveFormsModule,
    SalonRatingPageRoutingModule
  ],
  declarations: [SalonRatingPage]
})
export class SalonRatingPageModule {}
