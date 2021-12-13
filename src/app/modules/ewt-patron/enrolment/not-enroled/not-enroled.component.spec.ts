import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotEnroledComponent } from './not-enroled.component';

describe('NotEnroledComponent', () => {
  let component: NotEnroledComponent;
  let fixture: ComponentFixture<NotEnroledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotEnroledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotEnroledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
