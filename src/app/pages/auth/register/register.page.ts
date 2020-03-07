import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { RegisterForm } from 'src/app/models/RegisterForm';

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  registerModel: RegisterForm;
  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

  // Dismiss Register Modal
  dismissRegister() {
    this.modalController.dismiss();
  }

  // On Login button tap, dismiss Register modal and open login Modal
  async loginModal() {
    this.dismissRegister();
    const loginModal = await this.modalController.create({
      component: LoginPage
    });
    return await loginModal.present();
  }

  register(form: NgForm) {
    this.registerModel = new RegisterForm();
    this.registerModel.password = form.value.password;
    this.registerModel.username = form.value.username;
    this.registerModel.phone = form.value.phone;
    this.registerModel.email = form.value.email;

    this.authService.register(this.registerModel).subscribe(
      data => {
        this.authService.login(form.value.email, form.value.password).subscribe(
          data => {},
          error => {
            this.alertService.presentToast(error);
          },
          () => {
            this.dismissRegister();
            this.navCtrl.navigateRoot("/home");
          }
        );
        this.alertService.presentToast(data["message"]);
      },
      error => {
        this.alertService.presentToast(error);
      },
      () => {}
    );
  }
}