import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    public toastController: ToastController,
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
}
