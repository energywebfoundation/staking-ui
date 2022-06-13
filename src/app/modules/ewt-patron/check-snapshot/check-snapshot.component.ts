import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SnapshotSuccessComponent } from "../snapshot-success/snapshot-success.component";

@Component({
  selector: "app-check-snapshot",
  templateUrl: "./check-snapshot.component.html",
  styleUrls: ["./check-snapshot.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckSnapshotComponent {
  constructor(private dialog: MatDialog) {}

  checkSnapshots() {
    this.dialog.open(SnapshotSuccessComponent, {
      width: '400px',
      maxWidth: '100%',
    });
  }
}
