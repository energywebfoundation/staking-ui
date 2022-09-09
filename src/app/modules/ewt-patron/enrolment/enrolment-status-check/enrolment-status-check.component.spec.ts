import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedModule } from '../../../../shared/shared.module';

import { EnrolmentStatusCheckComponent } from './enrolment-status-check.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('EnrolmentStatusCheckComponent', () => {
  let component: EnrolmentStatusCheckComponent;
  let fixture: ComponentFixture<EnrolmentStatusCheckComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EnrolmentStatusCheckComponent],
      providers: [provideMockStore()],
      imports: [SharedModule],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolmentStatusCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
