import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesMeliHeaderComponent } from './sales-meli-header.component';

describe('SalesMeliHeaderComponent', () => {
  let component: SalesMeliHeaderComponent;
  let fixture: ComponentFixture<SalesMeliHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesMeliHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesMeliHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
