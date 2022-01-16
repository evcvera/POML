import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleItemDeskComponent } from './sale-item-desk.component';

describe('SaleItemDeskComponent', () => {
  let component: SaleItemDeskComponent;
  let fixture: ComponentFixture<SaleItemDeskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleItemDeskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleItemDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
