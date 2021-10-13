import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTextComponent } from './sub-text.component';

describe('SubTextComponent', () => {
  let component: SubTextComponent;
  let fixture: ComponentFixture<SubTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
