import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalonsPageRoutingModule } from './salons-routing.module';

import { SalonsPage } from './salons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalonsPageRoutingModule
  ],
  declarations: [SalonsPage]
})
export class SalonsPageModule {}
