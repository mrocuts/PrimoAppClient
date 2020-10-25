import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Vehiculo } from 'src/app/models/vehiculo';
import { ModalCar1Component } from '../components/modal-car1/modal-car1.component';
import { ModalCar2Component } from '../components/modal-car2/modal-car2.component';
import { ModalCar3Component } from '../components/modal-car3/modal-car3.component';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.page.html',
  styleUrls: ['./new-car.page.scss'],
})
export class NewCarPage implements OnInit {

  _car : Vehiculo = new Vehiculo(
   null,
    null,
     null,
     null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,    
    null,
    null );
  _tipoVehiculo :string;

  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {
  }

  // newCar(){
  //   this.modalCtrl.create({
  //     component : ModalCar1Component
  //   }).then(modal1 => {
  //     modal1.present();
  //     return modal1.onDidDismiss();
  //   }).then((dataModal1) => {
  //     console.log(dataModal1);
  //     if(dataModal1.role === "sucess"){
  //       this._car.idTipoVehiculo = dataModal1.data["id"];
  //       this._tipoVehiculo = dataModal1.data["valor"];
  //     }
  //     this.OnCreateModalStep2().then(modal2 => {
  //       modal2.present();
  //       return modal2.onDidDismiss();
  //     })
  //   })
  // }

  newCar(){
    this.createModal(ModalCar1Component,{}).then(dataModal1 => {
      if (dataModal1.role === "sucess") {
        this._car.idTipoVehiculo = dataModal1.data["id"];
        this._tipoVehiculo = dataModal1.data["valor"];
      }
      this.createModal(ModalCar2Component,
                        { idTipoVehiculo : dataModal1.data["id"] }).then(dataModal2 => {
                          if (dataModal2.role === "sucess") {
                           this._car.idModelo = dataModal2.data["IdModelo"];
                           this._car.strTransmision = dataModal2.data["Transmision"];
                          }
                          this.createModal(ModalCar3Component,{}).then(dataModal3 =>{
                            console.log(dataModal3);
                            if(dataModal3.role === "sucess"){
                              this._car.strColor = dataModal3.data["color"];
                              this._car.intPuertas = dataModal3.data["nropuertas"];
                              this._car.intanio = dataModal3.data["annio"];
                              this._car.strPlaca = dataModal3.data["placa"];
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
}
