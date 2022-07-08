import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotVerifiedInfoComponent } from './not-verified-info.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('NotVerifiedInfoComponent', () => {
  let component: NotVerifiedInfoComponent;
  let fixture: ComponentFixture<NotVerifiedInfoComponent>;
  let store: MockStore;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NotVerifiedInfoComponent],
        providers: [provideMockStore()]
      }).compileComponents();
      store = TestBed.inject(MockStore);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NotVerifiedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
