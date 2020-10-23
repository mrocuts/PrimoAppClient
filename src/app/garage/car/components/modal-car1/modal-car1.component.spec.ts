import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalCar1Component } from './modal-car1.component';

describe('ModalCar1Component', () => {
  let component: ModalCar1Component;
  let fixture: ComponentFixture<ModalCar1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCar1Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCar1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
