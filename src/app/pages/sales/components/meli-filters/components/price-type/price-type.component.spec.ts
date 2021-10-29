import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceTypeComponent } from './price-type.component';

describe('PriceTypeComponent', () => {
  let component: PriceTypeComponent;
  let fixture: ComponentFixture<PriceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
