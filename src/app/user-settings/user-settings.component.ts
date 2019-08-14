import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  soilUpper = new FormControl(60, [Validators.required, Validators.min(0), Validators.max(100)]);
  soilLower = new FormControl(20, [Validators.required, Validators.min(0), Validators.max(100)]);
  tempUpper = new FormControl(90, [Validators.required, Validators.min(0), Validators.max(120)]);
  tempLower = new FormControl(60, [Validators.required, Validators.min(0), Validators.max(120)]);
  sunThresh = new FormControl(500, [Validators.required, Validators.min(0), Validators.max(1000)]);
  shadeThresh = new FormControl(50, [Validators.required, Validators.min(0), Validators.max(1000)]);

  constructor() { }

  ngOnInit() {
  }

  getErrorMessage(form: FormControl) {
    return form.hasError('required') ? 'You must enter a value' :
        form.hasError('min') || form.hasError('max') ? 'You must enter a valid number.' :
            '';
  }

}