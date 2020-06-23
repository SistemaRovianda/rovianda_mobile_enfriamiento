import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class ToastService {
  constructor(private toastCtrl: ToastController) {}

  async presentToastSuccess() {
    const toast = await this.toastCtrl.create({
      message: "Operacion exitosa!",
      duration: 2000,
      color: "success",
    });
    toast.present();
  }

  async presentToastError() {
    const toast = await this.toastCtrl.create({
      message: "Error en la operación!",
      duration: 2000,
      color: "danger",
    });
    toast.present();
  }
}
