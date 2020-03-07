import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalonRatingPage } from './salon-rating.page';

describe('SalonRatingPage', () => {
  let component: SalonRatingPage;
  let fixture: ComponentFixture<SalonRatingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonRatingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalonRatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
