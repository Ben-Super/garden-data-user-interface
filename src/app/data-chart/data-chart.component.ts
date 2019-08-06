
import {Component, OnInit, Input} from '@angular/core';

import { DataGathererService } from '../data-gatherer/data-gatherer.service';
import { RestService } from '../rest/rest.service';

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

  @Input() field: string;
  @Input() type: string;

  data = [{ data: [], label: 'No Data Provided' }];
  chartType = 'line'
  temperatureData = [{ data: [], label: 'Temperature' }];
  soilMoistureData = [{ data: [], label: 'Soil Moisture' }];
  sunlightData = [{ data: [], label: 'Sunlight' }];

  timestamps = [];

  ngOnInit() {
    switch(this.field) {
      case '1':
        this.data = this.temperatureData;
        break;
      case '2': 
        this.data = this.soilMoistureData;
        break;
      case '3': 
        this.data = this.sunlightData;
        break;
      default:
        throw 'No field selector provided!';
        break;
    }
    if (this.type == 'line' || this.type == 'pie') {
      this.chartType = this.type;
    } else {
      throw 'Invalid or unprovided chart type!';
    }
    this.getData();
  }

  getData() {
    this.rest.get()
      .subscribe(
        result => {
          this.timestamps.push(this.format(new Date(result.feeds[0].created_at)));
          this.temperatureData[0].data.push(parseFloat(result.feeds[0].field1));
          this.soilMoistureData[0].data.push(parseFloat(result.feeds[0].field3));
          this.sunlightData[0].data.push(parseFloat(result.feeds[0].field4));
        },
        error => console.log("Error >>> " + error)
      )
  }

  format(date: Date) {
    return date.getHours() + ':' + date.getMinutes();
  }

  constructor(private rest: RestService) {}

}