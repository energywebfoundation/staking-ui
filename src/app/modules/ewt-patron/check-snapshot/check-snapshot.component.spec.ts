import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckSnapshotComponent } from './check-snapshot.component';

describe('CheckSnapshotComponent', () => {
  let component: CheckSnapshotComponent;
  let fixture: ComponentFixture<CheckSnapshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckSnapshotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
