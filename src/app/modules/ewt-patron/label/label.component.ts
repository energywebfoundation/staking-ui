import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input
} from "@angular/core";

@Component({
  selector: "app-label",
  templateUrl: "./label.component.html",
  styleUrls: ["./label.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent {
  @HostBinding("class") @Input() size: "xs" | "sm" | "md" | "xl";
}
