import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Vehiculo } from 'src/app/models/vehiculo';
import { TipoVehiculo } from '../../../models/tipoVehiculo';
import { GarajeService } from 'src/app/services/garaje/garaje.service';
import { UIAlertService } from 'src/app/UITools/uialert.service';
import { ModalCar1Component } from '../components/modal-car1/modal-car1.component';
import { ModalCar2Component } from '../components/modal-car2/modal-car2.component';
import { ModalCar3Component } from '../components/modal-car3/modal-car3.component';
import { Modelo } from 'src/app/models/modelo';
import { Garaje } from 'src/app/models/garaje';
import { Marca } from 'src/app/models/marca';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.page.html',
  styleUrls: ['./new-car.page.scss'],
})
export class NewCarPage implements OnInit {

  idGaraje : number = this.activatedRoute.snapshot.params.idGaraje;

  _vehiculo : Vehiculo = new Vehiculo;
  _tipoVehiculo : TipoVehiculo = new TipoVehiculo;
  _modelo : Modelo = new Modelo;
  _garaje : Garaje = new Garaje;
  _marca : Marca = new Marca;

  constructor(private modalCtrl : ModalController,
              private garajeService : GarajeService,
              private activatedRoute : ActivatedRoute,
              private alert :UIAlertService,
              private router : Router) { }

  ngOnInit() {
    this._tipoVehiculo = {
      // idTipoVehiculo : null, 
      // strDescripcion :null
    };
    this._garaje = { 
      idGaraje : this.idGaraje
     };
     this._modelo = {
      //  idModelo : null,
      //  strDescripcion : null,
      //  bitActivo : null,
      //  myMarca : {}
     };
     this._marca = {};
     this._vehiculo.strMotor = "";
     this._vehiculo.strPathSOAT =" ";
     this._vehiculo.strSerial = " ";
     
  }


  nuevoVehiculo(){
    this.createModal(ModalCar1Component,{}).then(dataModal1 => {
      if (dataModal1.role === "sucess") {
        this._tipoVehiculo.idTipoVehiculo = dataModal1.data["id"];
        this._tipoVehiculo.strDescripcion = dataModal1.data["valor"];
      }
      this.createModal(ModalCar2Component,{ idTipoVehiculo : dataModal1.data["id"] })
        .then(dataModal2 => { 
          if (dataModal2.role === "sucess") {
            this._modelo = {
              idModelo : dataModal2.data["IdModelo"],
              strDescripcion : dataModal2.data["Modelo"]
            };
            this._marca = { 
              idMarca : dataModal2.data["IdMarca"],
              strDescripcion : dataModal2.data["Marca"]
            };
            this._vehiculo.strTransmision = dataModal2.data["Transmision"];
            this._vehiculo.intAnio = dataModal2.data["Annio"];
          }
          this.createModal(ModalCar3Component,{}).then(dataModal3 =>{
            console.log(dataModal3);
            if(dataModal3.role === "sucess"){
              this._vehiculo.strColor = dataModal3.data["color"];
              this._vehiculo.intPuertas = dataModal3.data["nropuertas"];
              this._vehiculo.strPlaca = dataModal3.data["placa"];
              this._vehiculo.strObservacion = dataModal3.data["observacion"];
            }
          })
        })
    })
  }

  async createModal(component :any, params : {}):Promise<any>{
    return await this.modalCtrl.create({
      component : component,
      componentProps : params
    }).then(m => {
      m.present();
      return m.onDidDismiss();
    });
  }

  guardarVehiculo(){
    console.log(this._vehiculo);
    this._vehiculo.myTipoVehiculo = this._tipoVehiculo;
    this._vehiculo.myGaraje = this._garaje;
    this._modelo.myMarca = this._marca;
    this._vehiculo.myModelo = this._modelo;
    this.garajeService.postVehiculo(this._vehiculo).subscribe(result => {
      console.log(result);
      if(!result['sucess']){
        this.alert.putMsgError(result['response'] );
        return;   
      }
    }, 
    err =>  {
      this.alert.putMsgError(err.response);
      return;
    },
    () => { 
      this.alert.putMsgInfo('El vehiculo se creo con exito!');
      this.router.navigate(['/dashboard']); 
    });
  }
}
