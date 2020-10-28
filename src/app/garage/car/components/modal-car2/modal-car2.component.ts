import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Marca } from 'src/app/models/marca';
import { Modelo } from 'src/app/models/modelo';
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
  annio : number;

  dataMarcas : Marca[] = [];
  dataModelos : Modelo[] = [];
  disabledModelo : boolean = true;
  marcaSelect :boolean = false;
  modeloSelect :boolean = false;


  constructor(private modalCtrl : ModalController,
              private garajeService : GarajeService) { }

  ngOnInit() {
    this.garajeService.getMarcaByTipoVehiculo(this.idTipoVehiculo)
    .subscribe((data: Marca[]) => {
      this.dataMarcas = data.slice();
    }, err => console.log(err)
    );
  }

  OnClose(){
    this.modalCtrl.dismiss(null,'cancel');
  }

  getValue($event){
    if($event.target.name == "sltMarca") {
      console.log($event.target);
      this.marcaSelect = true;
      this.IdMarca = $event.target.value;
      this.garajeService.getModeloByMarca(this.IdMarca)
      .subscribe((data: Modelo[]) => {
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
      return;
    }
  }
  
  continuaRegistro(){
    this.modalCtrl.dismiss({  
      IdMarca : this.IdMarca,
      Marca : this.dataMarcas.find(marca => marca.idMarca = this.IdMarca).strDescripcion,
      IdModelo : this.IdModelo, 
      Modelo : this.dataModelos.find(modelo => modelo.idModelo = this.IdModelo).strDescripcion,
      Transmision : this.Transmision,
      Annio : this.annio
    },'sucess');
  }

  
}
