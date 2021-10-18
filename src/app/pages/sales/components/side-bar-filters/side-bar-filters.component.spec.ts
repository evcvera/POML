import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarFiltersComponent } from './side-bar-filters.component';

describe('SideBarFiltersComponent', () => {
  let component: SideBarFiltersComponent;
  let fixture: ComponentFixture<SideBarFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
