import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckSnapshotComponent } from './check-snapshot.component';
import { MatDialog } from '@angular/material/dialog';

describe('CheckSnapshotComponent', () => {
  let component: CheckSnapshotComponent;
  let fixture: ComponentFixture<CheckSnapshotComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CheckSnapshotComponent],
        providers: [{ provide: MatDialog, useValue: {} }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
