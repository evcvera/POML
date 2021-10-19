import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedTimeRemainingComponent } from './expected-time-remaining.component';

describe('ExpectedTimeRemainingComponent', () => {
  let component: ExpectedTimeRemainingComponent;
  let fixture: ComponentFixture<ExpectedTimeRemainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpectedTimeRemainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpectedTimeRemainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
