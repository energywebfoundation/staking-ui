import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilverBubbleComponent } from './silver-bubble.component';

describe('SilverBubbleComponent', () => {
  let component: SilverBubbleComponent;
  let fixture: ComponentFixture<SilverBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SilverBubbleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SilverBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
