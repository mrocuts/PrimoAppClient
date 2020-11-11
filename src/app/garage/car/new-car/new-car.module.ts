import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCarPageRoutingModule } from './new-car-routing.module';

import { NewCarPage } from './new-car.page';
import { ModalCar1Component } from '../components/modal-car1/modal-car1.component';
import { ModalCar2Component } from '../components/modal-car2/modal-car2.component';
import { ModalCar3Component } from '../components/modal-car3/modal-car3.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCarPageRoutingModule
  ],
  declarations: [NewCarPage,ModalCar1Component, ModalCar2Component,ModalCar3Component],
  entryComponents:[ModalCar1Component, ModalCar2Component,ModalCar3Component],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class NewCarPageModule {}
