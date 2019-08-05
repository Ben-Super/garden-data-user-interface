
import {Component, OnInit} from '@angular/core';
import { interval } from 'rxjs';

import { DataGathererService } from '../data-gatherer/data-gatherer.service';

const UPDATE_INTERVAL = 1000;

/*
 * ~ Chart Component ~
 * 
 * Turns the data pulled off of thingspeak into interactive charts
 * 
 */
@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
})
export class DataChartComponent implements OnInit {
  
  chartOptions = {
    responsive: true
  };

  temperatureData = [{ data: [], label: 'Temperature' }];
  soilMoistureData = [{ data: [], label: 'Soil Moisture' }];
  sunlightData = [{ data: [], label: 'Sunlight' }];

  chartLabels = [];

  ngOnInit() {
    this.update();
  }

  update() {
    this.temperatureData[0].data = this.gatherer.temperatureData;
    this.soilMoistureData[0].data = this.gatherer.soilMoistureData;
    this.sunlightData[0].data = this.gatherer.sunlightData;
  }

  constructor(private gatherer: DataGathererService) {}

}