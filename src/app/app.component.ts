import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { Store } from '@ngrx/store';
import * as AuthActions from './state/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private store: Store) {
    this.matIconRegistry.addSvgIcon(
      'wallet-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icons/wallet-icon.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'constraints-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icons/constraints-icon.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'home-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icons/home-icon.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'statistics-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icons/statistics-icon.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'warning-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icons/warning-icon.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'account-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icons/account-icon.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'logout-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icons/logout-icon.svg')
    );
  }

  ngOnInit() {
    // prevent empty links to reload the page
    document.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && ['', '#'].indexOf(target.getAttribute('href')) > -1) {
        e.preventDefault();
      }
    });

    this.store.dispatch(AuthActions.init());
  }
}
