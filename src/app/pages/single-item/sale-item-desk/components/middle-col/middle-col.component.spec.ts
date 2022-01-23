import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleColComponent } from './middle-col.component';

describe('MiddleColComponent', () => {
  let component: MiddleColComponent;
  let fixture: ComponentFixture<MiddleColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiddleColComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
