import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotBtnComponent } from './snapshot-btn.component';

describe('SnapshotBtnComponent', () => {
  let component: SnapshotBtnComponent;
  let fixture: ComponentFixture<SnapshotBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapshotBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapshotBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
