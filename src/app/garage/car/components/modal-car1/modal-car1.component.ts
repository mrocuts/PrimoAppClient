import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-car1',
  templateUrl: './modal-car1.component.html',
  styleUrls: ['./modal-car1.component.scss'],
})
export class ModalCar1Component implements OnInit {

  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {}

  OnClose(){
    this.modalCtrl.dismiss(null,'cancel');
  }

  setTipoAuto(id : string){
    let valor :string;
    switch(id){
      case '1' : {
        valor = "Carro";
        break;
      }
      case '2' : {
        valor = "Camioneta";
        break;
      }
      case '3' : {
        valor = "Motocicleta";
        break;
      }
      case '4' : {
        valor = "Bicicleta"; 
        break;
      }
      default :{
        valor= "Carro";
        break;
      }
    }
    this.modalCtrl.dismiss({'id': id, 'valor': valor},"sucess");
    console.log(id);
  }

}
