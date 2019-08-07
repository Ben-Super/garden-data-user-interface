import { Component, OnInit, Input } from '@angular/core';
import { interval } from 'rxjs';

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
    responsive: true,
    scales: {
      yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0, max:100}}]
    }
  };

  @Input() field: string;
  @Input() type: string;

  data = [{ data: [], label: 'No Data Provided' }];
  chartType = 'line'
  today: Date;
  temperatureData = [{ data: [], label: 'Temperature' }];
  soilMoistureData = [{ data: [], label: 'Soil Moisture' }];
  sunlightData = [{ data: [], label: 'Sunlight' }];

  timestamps = [];

  ngOnInit() {
    this.chartType = this.type;
    if (this.type == 'line') {
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
    } else {
      throw 'Invalid or unprovided chart type!';
    }
    interval(1000).subscribe(x => {
      this.getData();
    });
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
          if (this.isNewData(result[0])) {
            this.today = new Date(result[0].created_at);
            this.timestamps.push(this.format(this.today));
            this.temperatureData[0].data.push(parseFloat(result[0].field1));
            this.soilMoistureData[0].data.push(parseFloat(result[0].field3));
            this.sunlightData[0].data.push(parseFloat(result[0].field4));
            this.refresh();
          }
        },
        error => console.log("Error >>> " + error)
      )
  }

  isNewData(result) {
    let index = this.timestamps.length - 1;
    if (index < 0) return true;
    return result.field1 != this.temperatureData[0].data[index] ||
            result.field3 != this.soilMoistureData[0].data[index] ||
            result.field4 != this.sunlightData[0].data[index];
  }



  format(date: Date) {
    return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  }

  constructor(private rest: RestService) {}

}