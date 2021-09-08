import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullIconComponent } from './full-icon.component';

describe('FullIconComponent', () => {
  let component: FullIconComponent;
  let fixture: ComponentFixture<FullIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
