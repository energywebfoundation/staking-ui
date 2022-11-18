import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

const THEME_KEY = 'theme'

@Component({
  selector: 'app-switch-theme',
  templateUrl: './switch-theme.component.html',
  styleUrls: ['./switch-theme.component.scss']
})
export class SwitchThemeComponent implements OnInit {
  themes = ['green', 'gold', 'silver'];
  constructor() { }

  ngOnInit(): void {
  }

  onChangeHandler(selection: MatSelectChange) {
    document.documentElement.setAttribute('data-theme', selection.value);
    localStorage.setItem(THEME_KEY, selection.value);
  }

}
