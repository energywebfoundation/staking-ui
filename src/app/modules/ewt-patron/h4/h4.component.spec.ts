import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H4Component } from './h4.component';

describe('H4Component', () => {
  let component: H4Component;
  let fixture: ComponentFixture<H4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ H4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(H4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
