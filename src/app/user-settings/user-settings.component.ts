import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserSettingsService } from './user-settings.service';

@Component({
  selector: 'user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  @Input() settings: UserSettingsService;

  constructor() { }

  ngOnInit() {
  }

  getErrorMessage(form: FormControl) {
    return form.hasError('required') ? 'You must enter a value' :
        form.hasError('min') || form.hasError('max') ? 'You must enter a valid number.' :
            '';
  }

}