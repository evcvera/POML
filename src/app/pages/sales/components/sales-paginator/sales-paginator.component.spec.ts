import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPaginatorComponent } from './sales-paginator.component';

describe('SalesPaginatorComponent', () => {
  let component: SalesPaginatorComponent;
  let fixture: ComponentFixture<SalesPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
