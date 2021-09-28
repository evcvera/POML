import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesItemClassifiedComponent } from './sales-item-classified.component';

describe('SalesItemClassifiedComponent', () => {
  let component: SalesItemClassifiedComponent;
  let fixture: ComponentFixture<SalesItemClassifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesItemClassifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesItemClassifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
