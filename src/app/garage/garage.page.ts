import { Component, OnInit } from '@angular/core';
import { Marca } from '../models/marca';
import { Modelo } from '../models/modelo';
import { TipoVehiculo } from '../models/tipoVehiculo';
import { User } from '../models/user';
import { Vehiculo } from '../models/vehiculo';
import { GarajeService } from '../services/garaje/garaje.service';
import { SessionManagerService } from '../services/user/session-manager.service';
import { UIAlertService } from '../UITools/uialert.service';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.page.html',
  styleUrls: ['./garage.page.scss'],
})
export class GaragePage implements OnInit {

  informacionUsuario : User = {};
  vehiculos : Vehiculo[] = [];
  vehiculoActivo : Vehiculo;
  vehiculoModelo : Modelo;
  vehiculoMarca: Marca;
  vehiucloTipo : TipoVehiculo;

  constructor(private sessionUser : SessionManagerService,
              private alert : UIAlertService,
              private garajeService : GarajeService) { }

  ngOnInit() {
    this.informacionUsuario = this.sessionUser.user_in_session;
    if(!this.informacionUsuario){
      this.alert.putMsgInfo('No se encontro información');
      return;
    }
    this.garajeService.getVehiculo(this.sessionUser.idgaraje).subscribe(vehiculos => {
      this.vehiculos = vehiculos;
      this.vehiculoActivo = vehiculos[1];
      console.log(this.vehiculoActivo);
      this.vehiculoModelo = vehiculos[1].myModelo;
      this.vehiculoMarca = this.vehiculoModelo.myMarca;
      this.vehiucloTipo = vehiculos[1].myTipoVehiculo;
    });
 

  }

}
