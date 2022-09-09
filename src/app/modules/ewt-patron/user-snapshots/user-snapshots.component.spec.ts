import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSnapshotsComponent } from './user-snapshots.component';

describe('UserSnapshotsComponent', () => {
  let component: UserSnapshotsComponent;
  let fixture: ComponentFixture<UserSnapshotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSnapshotsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSnapshotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
