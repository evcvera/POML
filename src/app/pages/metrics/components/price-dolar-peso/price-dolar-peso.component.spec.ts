import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDolarPesoComponent } from './price-dolar-peso.component';

describe('PriceDolarPesoComponent', () => {
  let component: PriceDolarPesoComponent;
  let fixture: ComponentFixture<PriceDolarPesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceDolarPesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceDolarPesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
