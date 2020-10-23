/**
 * Imports
 */
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

/**
 * Servicio para el manejo de las sesiones
 */
@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  /** Atributos de Clase **/
  user_in_session:User;

  /**
   * Constructor Vacio
   */
  constructor() { }

  /**
   * Método de Logout
   */
  logout(){
    this.user_in_session=null;
  }
}
