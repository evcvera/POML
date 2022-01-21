import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleItemDeskComponent } from './single-item-desk.component';

describe('SingleItemDeskComponent', () => {
  let component: SingleItemDeskComponent;
  let fixture: ComponentFixture<SingleItemDeskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleItemDeskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleItemDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
