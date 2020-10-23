/**
 * Imports
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UIAlertService } from '../UITools/uialert.service';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user';
import { GarajeService } from '../services/garaje/garaje.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /** Atributos de Clase **/
  user: User;

  /**
   * Metodo Constructor
   * @param alert 
   * @param router 
   */
  constructor(public alert : UIAlertService,
              public router: Router,
              public userService: UserService,
              public garajeService : GarajeService) {}
            
  /**
   * Método que valida el campo de Nombre de Usuario
   * @param username 
   */
  validateUsername(username: string){
    if(username.length!=0 && (!username.includes("@") || !username.includes(".com"))){
      this.alert.putMsgError('El formato del nombre de usuario no es valido. Verifique e intente nuevamente','Error de formato');
    }
  }

  /**
   * Método que consulta la información de un Usuario
   * @param username 
   * @param password 
   */
  async getUser(username:string, password:string) {
    // this.userService.getUser(username, password);
    // this.user = this.userService.user;
    // if(!this.userService.user){
    //   console.log("Usuario obtenido: "+this.userService.user);
    // }
//borrar
await this.userService.getUser(username,password).then(data =>{
  this.user = Object.assign(new User, data);
  console.log(this.user);
  if(!this.user){
      console.log(`Usuario obtenido: ${this.user}`);
  }
})

  }
  
  /**
   * Método que se encarga de autenticar un cliente
   * @param username 
   * @param password 
   */
  async login(username : string, password : string){
    if(username.length==0 || password.length==0){
      this.alert.putMsgError('Se requiere un valor', 'El usuario y/o contraseña no pueden estar vacios. Ingrese su usario y/o contraseña para contrinuar');
    }else{
      await this.getUser(username, password);
      console.log(this.user);
      if(!this.user){
        this.alert.putMsgError("El usuario y/o contraseña no son válidos. Verifique e intente nuevamente", "Error al inicar sesión");
      }else{
        if (this) {
          
        }
        this.router.navigate(['/dashboard']);
      }
    }
  }

  getGarajeUsuario(){
    this.garajeService.getGarajeUsuario(3).subscribe(data => {
      console.log(data);
    },
    err => console.log(err));
  }

  getVehiculo(){
    this.garajeService.getVehiculo(1).subscribe(data => {
      console.log(data);
    },
    err => console.log('Se presento un error',err),
    () => console.log('Esta vacio'))
  }
}
