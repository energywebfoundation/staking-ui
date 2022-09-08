import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftContainerComponent } from './nft-container.component';

describe('NftContainerComponent', () => {
  let component: NftContainerComponent;
  let fixture: ComponentFixture<NftContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
