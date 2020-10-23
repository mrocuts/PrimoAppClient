/**
 * Imports
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrimoURL } from 'src/app/constants/primo-url';
import { User } from 'src/app/models/user';
import { map, catchError } from 'rxjs/operators';
import { Primoconst } from 'src/app/constants/primoconst';


/**
 * Esta clase maneja todos las operaciones que se puede realizar para 
 * los usuarios del sistema.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /** Atributos de Método **/
  primourl:PrimoURL;
  constants: Primoconst;

  /**
   * Inicializa los datos del Servicio
   * @param client 
   */
  constructor(private client: HttpClient) { 
    this.primourl=new PrimoURL();
    this.constants = new Primoconst();
  }

  /**
   * Obtiene un usuario dados su nombre de usuario y su contraseña.
   * @param username nombre de usuario cargado por el usuario del aplicativo.
   * @param password contraseña ingresada por el usuario
   */
  getUser(username:string, password:string){
    var URL=this.primourl.PR_LOGIN_URL;
    URL=URL.replace('username', username);
    URL=URL.replace('password', password);
    URL=URL.replace('usrtype', ''+this.constants.USER_PUBLIC);
    alert(URL);
    console.log("URL WS: "+URL);
    return this.client.get<User>(URL);
  }

  newUser(newUser : User){
    return this.client.post(this.primourl.PR_NEWUSER_URL, newUser);
  }
}
