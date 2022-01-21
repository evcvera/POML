import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiniLeftImgComponent } from './tini-left-img.component';

describe('TiniLeftImgComponent', () => {
  let component: TiniLeftImgComponent;
  let fixture: ComponentFixture<TiniLeftImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiniLeftImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiniLeftImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
