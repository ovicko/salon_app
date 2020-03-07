import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { LandingPage } from '../../landing/landing.page';
import { LoginPage } from '../login/login.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RegisterPageRoutingModule],
  declarations: [LoginPage, RegisterPage],
  entryComponents: [LoginPage, RegisterPage]
})
export class RegisterPageModule {}
