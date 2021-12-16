import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { SharedModule } from '../../../../shared/shared.module';

import { EnrolmentStatusCheckComponent } from './enrolment-status-check.component';

describe('EnrolmentStatusCheckComponent', () => {
  let component: EnrolmentStatusCheckComponent;
  let fixture: ComponentFixture<EnrolmentStatusCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolmentStatusCheckComponent ],
      providers: [ { provide: Store, useValue: {} }],
      imports: [SharedModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolmentStatusCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
