import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesContainerComponent } from './sales-container.component';

describe('SalesContainerComponent', () => {
  let component: SalesContainerComponent;
  let fixture: ComponentFixture<SalesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
