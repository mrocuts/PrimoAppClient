/**
 * Imports
 */
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
/**
 * Este servicio permite centralizar el estilo de generacion de alertas
 */
export class UIAlertService {

  /**
   * Construye una nueva instancia de este servicio.
   * @param alertControler un controlador de alertas.
   */
  constructor(public toastController: ToastController) { }


  
  /**
   * Construye y muestra un mensaje de alerta de tipo informativo.
   * @param message Mensaje a mostrar.
   */
  async putMsgInfo(message: string){
    const toast = await this.toastController.create({
      animated:true,
      header: 'Información',
      message: message,
      duration: 2000,
      position:"top",
      color:"medium"
    })
    await toast.present();
  }

  /**
   * Construye y muestra un mensaje de alerta de tipo error.
   * @param message Mensaje a mostrar.
   */
  async putMsgError(message: string){
    const toast = await this.toastController.create({
      animated:true,
      header: 'Error',
      message: message,
      duration: 2000,
      position:"top",
      color:"warning"
    })
    await toast.present();
  }

  /**
   * Construye y muestra un mensaje de alerta de tipo fatal.
   * @param message Mensaje a mostrar.
   */
  async putMsgFatal(message: string){
    const toast = await this.toastController.create({
      animated:true,
      header: 'FATAL',
      message: message,
      duration: 2000,
      position:"top",
      color:"danger"
    })
    await toast.present();
  }
}
