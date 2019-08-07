import { Component, OnInit, Input } from '@angular/core';

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

  refresh() {
    this.timestamps = this.timestamps.slice(0);
    this.temperatureData = Object.assign({}, this.temperatureData);
    this.soilMoistureData = Object.assign({}, this.soilMoistureData);
    this.sunlightData = Object.assign({}, this.sunlightData);
  }

  getData() {
    this.rest.get()
      .subscribe(
        result => {
          for (let i = 0; i < result.length; ++i) {
            this.timestamps.push(this.format(new Date(result[i].created_at)));
            this.temperatureData[0].data.push(parseFloat(result[i].field1));
            this.soilMoistureData[0].data.push(parseFloat(result[i].field3));
            this.sunlightData[0].data.push(parseFloat(result[i].field4));
          }
          this.refresh();
        },
        error => console.log("Error >>> " + error)
      )
  }

  format(date: Date) {
    return date.getHours() + ':' + date.getMinutes();
  }

  constructor(private rest: RestService) {}

}