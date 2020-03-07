import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalonsPage } from './salons.page';

describe('SalonsPage', () => {
  let component: SalonsPage;
  let fixture: ComponentFixture<SalonsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
