import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemsGroupComponent } from './search-items-group.component';

describe('SearchItemsGroupComponent', () => {
  let component: SearchItemsGroupComponent;
  let fixture: ComponentFixture<SearchItemsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchItemsGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchItemsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
