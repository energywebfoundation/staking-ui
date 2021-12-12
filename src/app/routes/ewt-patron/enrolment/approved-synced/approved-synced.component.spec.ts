import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedSyncedComponent } from './approved-synced.component';

describe('ApprovedSyncedComponent', () => {
  let component: ApprovedSyncedComponent;
  let fixture: ComponentFixture<ApprovedSyncedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedSyncedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedSyncedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
