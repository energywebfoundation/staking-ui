import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotRewardDescriptionComponent } from './snapshot-reward-description.component';

describe('SnapshotRewardDescriptionComponent', () => {
  let component: SnapshotRewardDescriptionComponent;
  let fixture: ComponentFixture<SnapshotRewardDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnapshotRewardDescriptionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapshotRewardDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
