import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimNftComponent } from './claim-nft.component';

describe('ClaimNftComponent', () => {
  let component: ClaimNftComponent;
  let fixture: ComponentFixture<ClaimNftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimNftComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
