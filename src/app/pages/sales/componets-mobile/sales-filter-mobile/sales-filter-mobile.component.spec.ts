import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesFilterMobileComponent } from './sales-filter-mobile.component';

describe('SalesFilterMobileComponent', () => {
  let component: SalesFilterMobileComponent;
  let fixture: ComponentFixture<SalesFilterMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesFilterMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesFilterMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
