import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GarajeService } from 'src/app/services/garaje/garaje.service';

@Component({
  selector: 'app-modal-car2',
  templateUrl: './modal-car2.component.html',
  styleUrls: ['./modal-car2.component.scss'],
})
export class ModalCar2Component implements OnInit {

  constructor(private modalCtrl : ModalController,
              private garajeService : GarajeService) { }

  ngOnInit() {
    this.garajeService.getMarcaByTipoVehiculo(1).subscribe(data => console.log(data), err => console.log(err));
  }

  OnClose(){
    this.modalCtrl.dismiss(null,'cancel');
  }

}
