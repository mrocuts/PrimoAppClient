import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalCar3Component } from './modal-car3.component';

describe('ModalCar3Component', () => {
  let component: ModalCar3Component;
  let fixture: ComponentFixture<ModalCar3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCar3Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCar3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
