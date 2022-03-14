import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotVerifiedInfoComponent } from './not-verified-info.component';

describe('NotVerifiedInfoComponent', () => {
  let component: NotVerifiedInfoComponent;
  let fixture: ComponentFixture<NotVerifiedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotVerifiedInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotVerifiedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
