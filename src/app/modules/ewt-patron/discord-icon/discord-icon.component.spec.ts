import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscordIconComponent } from './discord-icon.component';

describe('DiscordIconComponent', () => {
  let component: DiscordIconComponent;
  let fixture: ComponentFixture<DiscordIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscordIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscordIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
