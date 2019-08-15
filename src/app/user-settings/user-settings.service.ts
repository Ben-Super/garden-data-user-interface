import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Injectable()
export class UserSettingsService {

  public soilUpper: FormControl;
  public soilLower: FormControl;
  public tempUpper: FormControl;
  public tempLower: FormControl;
  public sunThresh: FormControl;
  public shadeThresh: FormControl;
  constructor() {
    this.init();
  }

  init() {
    this.soilUpper = new FormControl(60, [Validators.required, Validators.min(0), Validators.max(100)]);
    this.soilLower = new FormControl(20, [Validators.required, Validators.min(0), Validators.max(100)]);
    this.tempUpper = new FormControl(90, [Validators.required, Validators.min(0), Validators.max(120)]);
    this.tempLower = new FormControl(60, [Validators.required, Validators.min(0), Validators.max(120)]);
    this.sunThresh = new FormControl(500, [Validators.required, Validators.min(0), Validators.max(1000)]);
    this.shadeThresh = new FormControl(50, [Validators.required, Validators.min(0), Validators.max(1000)]);
  }
}