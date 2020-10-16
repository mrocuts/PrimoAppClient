/**
 * Imports
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrimoURL } from 'src/app/constants/primo-url';
import { User } from 'src/app/models/user';
import { map, catchError } from 'rxjs/operators';

/**
 * Esta clase maneja todos las operaciones que se puede realizar para 
 * los usuarios del sistema.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /** Atributos de Método **/
  urlInk:string='';
  primourl:PrimoURL;
  public user: User;

  /**
   * Inicializa los datos del Servicio
   * @param client 
   */
  constructor(private client: HttpClient) { 
    this.primourl=new PrimoURL();
  }

  /**
   * Obtiene un usuario dados su nombre de usuario y su contraseña.
   * @param username nombre de usuario cargado por el usuario del aplicativo.
   * @param password contraseña ingresada por el usuario
   */
  getUser(username:string, password:string){
    this.urlInk=this.primourl.PR_LOGIN_URL;
    this.urlInk=this.urlInk.replace('username', username);
    this.urlInk=this.urlInk.replace('password', password);
    this.urlInk=this.urlInk.replace('usrtype', '1');
    console.log("URL WS: "+this.urlInk);
    return new Promise(resolve => {
      this.client.get(this.urlInk).subscribe(data => {
        this.user = Object.assign(new User(), data);
        resolve(data);
        console.log(this.user.strUsuario);
      }, err => {
        console.log(err);
      });
    });
  }

  newUser(newUser : User){
    this.urlInk = this.primourl.PR_NEWUSER_URL;
    console.log(newUser);
    console.log(this.urlInk);
    return this.client.post(this.urlInk, newUser);
  }
}
