import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GarajeService } from 'src/app/services/garaje/garaje.service';

@Component({
  selector: 'app-modal-car2',
  templateUrl: './modal-car2.component.html',
  styleUrls: ['./modal-car2.component.scss'],
})
export class ModalCar2Component implements OnInit {

  @Input() idTipoVehiculo : number;

  IdMarca : number;
  IdModelo : number;
  Transmision : string;

  dataLoading : any[] = [];
  dataModelos : any[] = [];
  disabledModelo : boolean = true;
  marcaSelect :boolean = false;
  modeloSelect :boolean = false;


  constructor(private modalCtrl : ModalController,
              private garajeService : GarajeService) { }

  ngOnInit() {
    this.garajeService.getMarcaByTipoVehiculo(this.idTipoVehiculo)
    .subscribe((data: any[]) => {
      this.dataLoading = data.slice();
    }, err => console.log(err)
    );
  }

  OnClose(){
    this.modalCtrl.dismiss(null,'cancel');
  }

  getValue($event){
    console.log($event.target.name);
    if($event.target.name == "sltMarca") {
      console.log('entra1');
      this.marcaSelect = true;
      this.IdMarca = $event.target.value;
      this.garajeService.getModeloByMarca(this.IdMarca)
      .subscribe((data: any[]) => {
        this.dataModelos = data.slice();
        this.disabledModelo =  false;
      });
      return;
    }
    if($event.target.name == "sltModelo"){
      console.log('entra2');
      this.modeloSelect = true;
      this.IdModelo = $event.target.value;
      return;
    }

    if($event.target.name == "sltTransmision"){
      console.log('entra3');
      this.Transmision = $event.target.value;
      this.modalCtrl.dismiss({IdMarca : this.IdMarca, IdModelo : this.IdModelo, Transmision : this.Transmision},'sucess');
    }
  }

  
}
