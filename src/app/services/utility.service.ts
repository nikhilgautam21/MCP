import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    public toastController: ToastController,
    public alertCtrl: AlertController
  ) { }

  getUserInfo() {
    return localStorage.getItem('user')
  }

  async showToast(msg, type: any = '') {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: type,
      duration: 2000
    });
    toast.present();
  }

  showAlert(){
    return new Promise(async (resolve, reject)=>{
      const alert = await this.alertCtrl.create({
        message: "Are you sure ?",
        buttons: [{
          text: "Ok",
          handler: () => {
            resolve();
          }
        },
        {
          text: "Cancel",
          handler: () => {
            reject();
          }
        }],
        backdropDismiss: false
      });
      await alert.present();
    })
  }
}
