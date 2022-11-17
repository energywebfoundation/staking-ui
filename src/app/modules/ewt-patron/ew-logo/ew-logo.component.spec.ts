import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EwLogoComponent } from './ew-logo.component';

describe('EwLogoComponent', () => {
  let component: EwLogoComponent;
  let fixture: ComponentFixture<EwLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EwLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EwLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
