import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipCodeModalMobileComponent } from './zip-code-modal-mobile.component';

describe('ZipCodeModalMobileComponent', () => {
  let component: ZipCodeModalMobileComponent;
  let fixture: ComponentFixture<ZipCodeModalMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZipCodeModalMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipCodeModalMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
