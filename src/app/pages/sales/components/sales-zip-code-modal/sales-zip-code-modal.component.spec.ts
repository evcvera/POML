import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesZipCodeModalComponent } from './sales-zip-code-modal.component';

describe('SalesZipCodeModalComponent', () => {
  let component: SalesZipCodeModalComponent;
  let fixture: ComponentFixture<SalesZipCodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesZipCodeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesZipCodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
