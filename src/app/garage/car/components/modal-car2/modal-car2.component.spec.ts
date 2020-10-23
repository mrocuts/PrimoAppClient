import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalCar2Component } from './modal-car2.component';

describe('ModalCar2Component', () => {
  let component: ModalCar2Component;
  let fixture: ComponentFixture<ModalCar2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCar2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
