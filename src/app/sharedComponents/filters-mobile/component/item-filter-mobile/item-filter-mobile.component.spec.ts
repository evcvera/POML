import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFilterMobileComponent } from './item-filter-mobile.component';

describe('ItemFilterMobileComponent', () => {
  let component: ItemFilterMobileComponent;
  let fixture: ComponentFixture<ItemFilterMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemFilterMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFilterMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
