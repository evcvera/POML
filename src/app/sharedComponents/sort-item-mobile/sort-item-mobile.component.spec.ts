import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortItemMobileComponent } from './sort-item-mobile.component';

describe('SortItemMobileComponent', () => {
  let component: SortItemMobileComponent;
  let fixture: ComponentFixture<SortItemMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortItemMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortItemMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
