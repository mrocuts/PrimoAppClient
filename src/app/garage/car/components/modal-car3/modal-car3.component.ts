import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-car3',
  templateUrl: './modal-car3.component.html',
  styleUrls: ['./modal-car3.component.scss'],
})
export class ModalCar3Component implements OnInit {

  constructor(private modalCtrl : ModalController) { }

  colores : Array<string>=['Rojo','Azul','Verde','Blanco','Gris','Negro','Amarillo'];

  color : string;
  nroPuertas : number;
  placa : string;
  observaciones : string;

  ngOnInit() {}

  onClose(){
    this.modalCtrl.dismiss({},'sucess');
  }

  terminarRegistro(){
    this.modalCtrl.dismiss({
      color : this.color, 
      nropuertas : this.nroPuertas, 
      placa : this.placa,
      observacion : this.observaciones
    },'sucess');
  }

  getValue($event){
    if($event.target.name == "sltColor") {
      this.color = $event.target.value;
      return;
    }
    if($event.target.name == "sltnroPuertas"){
      this.nroPuertas = $event.target.value;
      return;
    }
    
  }


}
