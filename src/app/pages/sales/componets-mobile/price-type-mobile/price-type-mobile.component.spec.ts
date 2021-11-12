import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceTypeMobileComponent } from './price-type-mobile.component';

describe('PriceTypeMobileComponent', () => {
  let component: PriceTypeMobileComponent;
  let fixture: ComponentFixture<PriceTypeMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceTypeMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceTypeMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
