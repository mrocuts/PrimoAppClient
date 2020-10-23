import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Vehiculo } from 'src/app/models/vehiculo';
import { ModalCar1Component } from '../components/modal-car1/modal-car1.component';
import { ModalCar2Component } from '../components/modal-car2/modal-car2.component';

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

  newCar(){
    this.modalCtrl.create({
      component : ModalCar1Component
    }).then(modal1 => {
      modal1.present();
      return modal1.onDidDismiss();
    }).then((dataModal1) => {
      console.log(dataModal1);
      if(dataModal1.role === "sucess"){
        this._car.idTipoVehiculo = dataModal1.data["id"];
        this._tipoVehiculo = dataModal1.data["valor"];
      }
      this.OnCreateModalStep2().then(modal2 => {
        modal2.present();
        return modal2.onDidDismiss();
      })
    })
  }

  OnCreateModalStep2() : Promise<any> {
    return this.modalCtrl.create({
      component : ModalCar2Component
    });
  }

}
