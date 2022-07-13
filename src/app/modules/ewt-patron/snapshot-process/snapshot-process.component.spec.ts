import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotProcessComponent } from './snapshot-process.component';

describe('SnapshotProcessComponent', () => {
  let component: SnapshotProcessComponent;
  let fixture: ComponentFixture<SnapshotProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapshotProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapshotProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
