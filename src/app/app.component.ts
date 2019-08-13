import { Component, OnInit } from '@angular/core';
import { 
  DataGathererService,
  IN_SUN_THRESHOLD,
  TEMP_UPPER_THRESHOLD,
  TEMP_LOWER_THRESHOLD,
  SOIL_UPPER_THRESHOLD,
  SOIL_LOWER_THRESHOLD
 } from './data-gatherer/data-gatherer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'garden-data-ui';
  inSun: number = IN_SUN_THRESHOLD;
  upperTemp: number = TEMP_UPPER_THRESHOLD;
  lowerTemp: number = TEMP_LOWER_THRESHOLD;
  upperSoil: number = SOIL_UPPER_THRESHOLD;
  lowerSoil: number = SOIL_LOWER_THRESHOLD;
  
  constructor(private gatherer: DataGathererService) {}

  ngOnInit() {
    this.gatherer.startGathering();
  }
}
