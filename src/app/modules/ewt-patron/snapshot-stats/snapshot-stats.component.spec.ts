import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotStatsComponent } from './snapshot-stats.component';

describe('SnapshotStatsComponent', () => {
  let component: SnapshotStatsComponent;
  let fixture: ComponentFixture<SnapshotStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapshotStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapshotStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
