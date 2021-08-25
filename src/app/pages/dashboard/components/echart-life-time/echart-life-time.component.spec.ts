import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartLifeTimeComponent } from './echart-life-time.component';

describe('EchartLifeTimeComponent', () => {
  let component: EchartLifeTimeComponent;
  let fixture: ComponentFixture<EchartLifeTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchartLifeTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartLifeTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
