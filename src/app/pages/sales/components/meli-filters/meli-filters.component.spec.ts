import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeliFiltersComponent } from './meli-filters.component';

describe('MeliFiltersComponent', () => {
  let component: MeliFiltersComponent;
  let fixture: ComponentFixture<MeliFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeliFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeliFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
