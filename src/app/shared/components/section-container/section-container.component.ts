import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-section-container',
  templateUrl: './section-container.component.html',
  styleUrls: ['./section-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionContainerComponent {
  @HostBinding('class') hostClasses = 'd-flex staking-widget flex-column';
}
