import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AlertModule } from 'ngx-bootstrap/alert';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { MinifiedDidViewerDirective } from './directives/minified-did-viewer/minified-did-viewer.directive';
import { MinifiedDidViewerDialogComponent } from './directives/minified-did-viewer/minified-did-viewer-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CopyToClipboardModule } from './directives/copy-to-clipboard/copy-to-clipboard.module';
import { DidFormatMinifierModule } from './pipes/did-format-minifier/did-format-minifier.module';


const MATERIAL_MODULES = [
  MatButtonModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressBarModule,
  MatRippleModule,
  MatTooltipModule,
  MatNativeDateModule,
];

// https://angular.io/styleguide#!#04-10
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    PopoverModule.forRoot(),
    CopyToClipboardModule,
    DidFormatMinifierModule,
    MATERIAL_MODULES
  ],
  declarations: [
    MinifiedDidViewerDirective,
    MinifiedDidViewerDialogComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlertModule,
    PopoverModule,
    MinifiedDidViewerDirective,
    MATERIAL_MODULES,
    CopyToClipboardModule,
    DidFormatMinifierModule,
  ],
  entryComponents: [MinifiedDidViewerDialogComponent]
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule
    };
  }
}
