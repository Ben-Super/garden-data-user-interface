import { Component, OnInit } from '@angular/core';
import { 
  DataGathererService,
  IN_SUN_THRESHOLD,
  IN_SHADE_THRESHOLD,
  TEMP_UPPER_THRESHOLD,
  TEMP_LOWER_THRESHOLD,
  SOIL_UPPER_THRESHOLD,
  SOIL_LOWER_THRESHOLD
 } from './data-gatherer/data-gatherer.service';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // App Title
  title = 'garden-data-ui';

  // Constants
  inSun: number = IN_SUN_THRESHOLD;
  inShade: number = IN_SHADE_THRESHOLD;
  upperTemp: number = TEMP_UPPER_THRESHOLD;
  lowerTemp: number = TEMP_LOWER_THRESHOLD;
  upperSoil: number = SOIL_UPPER_THRESHOLD;
  lowerSoil: number = SOIL_LOWER_THRESHOLD;

  // Icons
  faInfoCircle = faInfoCircle;
  
  constructor(private gatherer: DataGathererService) {}

  // Initializes gatherer to start grabbing data
  ngOnInit() {
    this.gatherer.startGathering();
  }
}
