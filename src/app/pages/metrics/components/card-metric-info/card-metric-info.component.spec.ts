import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMetricInfoComponent } from './card-metric-info.component';

describe('CardMetricInfoComponent', () => {
  let component: CardMetricInfoComponent;
  let fixture: ComponentFixture<CardMetricInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMetricInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMetricInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
