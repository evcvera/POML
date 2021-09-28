import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesFavouritesComponent } from './sales-favourites.component';

describe('SalesFavouritesComponent', () => {
  let component: SalesFavouritesComponent;
  let fixture: ComponentFixture<SalesFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesFavouritesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
