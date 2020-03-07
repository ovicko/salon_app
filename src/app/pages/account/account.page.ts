import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { Customer } from 'src/app/models/customer';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { EditAccountPageModule } from '../edit-account/edit-account.module';
import { EditAccountPage } from '../edit-account/edit-account.page';
import { Route, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "app-account",
  templateUrl: "./account.page.html",
  styleUrls: ["./account.page.scss"]
})
export class AccountPage implements OnInit {
  user: Customer;

  changePasswordLink: string;
  termsOfServiceLink: string;
  privacyPolicyLink: string;
  websiteLink: string;
  helpPageLink: string;

  username: string;
  email: string;
  phoneNumber: string;
  dataReturned: any;


  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private router: Router,
    private envService: EnvService
  ) {
    this.changePasswordLink =
      envService.MAIN_WEBSITE_URL + "site/request-password-reset";
    this.termsOfServiceLink = envService.MAIN_WEBSITE_URL + "site/terms";
    this.privacyPolicyLink = envService.MAIN_WEBSITE_URL + "site/policy";
    this.websiteLink = envService.MAIN_WEBSITE_URL;
    this.helpPageLink = envService.MAIN_WEBSITE_URL + "site/help";
  }

  ionViewWillEnter() {
    this.authService.customerDetails().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {}

  async openEditAccountModal() {
    const modal = await this.modalController.create({
      component: EditAccountPage,
      componentProps: {
        // paramUsername:this.user.name,
        // paramEmail:this.user.email,
        // paramPhone:this.user.phone,
        paramUsername:"Username",
        paramEmail:"Email",
        paramPhone:"cccccc",
        paramTitle: "Edit account Details"
      }
    });

    modal.onDidDismiss().then(dataReturned => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });

    return await modal.present();
  }

  logout(){
    this.authService.logout()
    this.router.navigateByUrl("/home");
  }
}
