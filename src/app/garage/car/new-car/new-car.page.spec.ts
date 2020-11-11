import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewCarPage } from './new-car.page';

describe('NewCarPage', () => {
  let component: NewCarPage;
  let fixture: ComponentFixture<NewCarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewCarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
