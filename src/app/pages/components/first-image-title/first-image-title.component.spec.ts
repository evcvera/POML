import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstImageTitleComponent } from './first-image-title.component';

describe('FirstImageTitleComponent', () => {
  let component: FirstImageTitleComponent;
  let fixture: ComponentFixture<FirstImageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstImageTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstImageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
