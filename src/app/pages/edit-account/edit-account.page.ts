import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: "app-edit-account",
  templateUrl: "./edit-account.page.html",
  styleUrls: ["./edit-account.page.scss"]
})
export class EditAccountPage implements OnInit {
  modalTitle: string;
  modelId: number;
  modalUsername: string;
  modalPhone: string;
  modalEmail: string;
  user: Customer;
  userId:number;
  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private navParams: NavParams
    ) {}
    
    ionViewWillEnter() {
      this.authService.customerDetails().subscribe(user => {
        this.user = user;
        this.userId = user.id;
        this.modalUsername = this.user.name;
        this.modalPhone = this.user.phone;
        this.modalEmail = this.user.email;
        
      });
    }
    
    ngOnInit() {
      // this.modalUsername = this.navParams.data.paramUsername;
      // this.modalPhone = this.navParams.data.paramPhone;
      // this.modalEmail = this.navParams.data.paramEmail;
      
      this.modalTitle = this.navParams.data.paramTitle;
      
      console.log(this.modalEmail);
    }
    
    async closeModal() {
      const onClosedData: string = "Wrapped Up!";
      await this.modalController.dismiss(onClosedData);
    }
    
    editAccount(form: NgForm) {
      this.authService
        .editAccount(
          this.userId,form.value.username,
          form.value.email,
          form.value.phone
        )
        .subscribe(
          data => {
            this.alertService.presentToast(data["message"]);
          },
          error => {
            console.log(error);
            this.alertService.presentToast(error);
          },
          () => {
            this.closeModal();
          }
        );
      }
    }
    