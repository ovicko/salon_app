import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastController: ToastController, public alertController: AlertController) { }
  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'dark'
    });
    toast.present();
  }

  async presentAlert(header:string, subheader:string,_message:string, buttons:string[]) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      message: _message,
      buttons: buttons
    });

    await alert.present();
  }
}
