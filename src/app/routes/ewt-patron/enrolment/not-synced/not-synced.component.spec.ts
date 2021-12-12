import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotSyncedComponent } from './not-synced.component';

describe('NotSyncedComponent', () => {
  let component: NotSyncedComponent;
  let fixture: ComponentFixture<NotSyncedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotSyncedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotSyncedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
