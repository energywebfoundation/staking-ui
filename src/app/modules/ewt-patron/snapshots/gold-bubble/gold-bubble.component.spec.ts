import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldBubbleComponent } from './gold-bubble.component';

describe('GoldBubbleComponent', () => {
  let component: GoldBubbleComponent;
  let fixture: ComponentFixture<GoldBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldBubbleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
