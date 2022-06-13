import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotSuccessComponent } from './snapshot-success.component';

describe('SnapshotSuccessComponent', () => {
  let component: SnapshotSuccessComponent;
  let fixture: ComponentFixture<SnapshotSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapshotSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapshotSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
