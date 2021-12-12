import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-not-enroled',
  templateUrl: './not-enroled.component.html',
  styleUrls: ['./not-enroled.component.scss']
})
export class NotEnroledComponent implements OnInit {
  email = new FormControl('', [Validators.email]);
  constructor() { }

  ngOnInit(): void {
  }

}
