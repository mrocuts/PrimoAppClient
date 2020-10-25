import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-car3',
  templateUrl: './modal-car3.component.html',
  styleUrls: ['./modal-car3.component.scss'],
})
export class ModalCar3Component implements OnInit {

  constructor(private modalCtrl : ModalController) { }

  colores : Array<string>=['#EF280F','#6DC36D','#109DFA','#000000','#FFFFFF'];

  color : string;
  nroPuertas : number;
  annio : number;
  placa : string;

  ngOnInit() {}

  onClose(){
    this.modalCtrl.dismiss({},'sucess');
  }

  terminarRegistro(){
    console.log(this.annio);
    this.modalCtrl.dismiss({color : this.color, nropuertas : this.nroPuertas, annio : this.annio, placa : this.placa},'sucess');
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
