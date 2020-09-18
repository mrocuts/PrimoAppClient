/**
 * Imports
 */
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

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
  constructor(public alertControler : AlertController) { }

  /**
   * Construye y muestra un mensaje de alerta de tipo informativo.
   * @param message Mensaje a mostrar.
   * @param title Titulo de la ventana.
   */
  async putMsgInfo(message: string, title:string){
    const alert = await this.alertControler.create({
      header: 'Información',
      subHeader: title,
      message: message,
      buttons : ['Aceptar']
    })
    await alert.present();
  }

  /**
   * Construye y muestra un mensaje de alerta de tipo error.
   * @param message Mensaje a mostrar.
   * @param title Titulo de la ventana.
   */
  async putMsgError(message: string, title:string){
    const alert = await this.alertControler.create({
      header: 'Error',
      subHeader: title,
      message: message,
      buttons : ['Aceptar']
    })
    await alert.present();
  }

  /**
   * Construye y muestra un mensaje de alerta de tipo fatal.
   * @param message Mensaje a mostrar.
   * @param title Titulo de la ventana.
   */
  async putMsgFatal(message: string, title:string){
    const alert = await this.alertControler.create({
      header: 'FATAL',
      subHeader: title,
      message: message,
      buttons : ['Aceptar']
    })
    await alert.present();
  }
}
