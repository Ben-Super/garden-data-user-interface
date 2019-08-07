import { Component, OnInit, Input } from '@angular/core';
import { interval } from 'rxjs';
import { DataGathererService } from '../data-gatherer/data-gatherer.service';

/*
 * ~ Sunlight Chart Component ~
 * 
 * Turns the sunlight data pulled off of thingspeak into interactive charts
 * 
 */
@Component({
  selector: 'temp-data-chart',
  templateUrl: './line-chart-template.html',
})
export class TemperatureChartComponent implements OnInit {
  
  chartOptions = {
    responsive: true,
    scales: {
      yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0, max:120}}]
    }
  };

  @Input() gatherer: DataGathererService;

  chartType = 'line'
  data = [{ data: [], label: 'Temperature' }];
  timestamps = [];

  ngOnInit() {
    interval(1000).subscribe(x => {
      this.refresh();
    });
  }

  refresh() {
    this.timestamps = this.gatherer.timestamps.slice(0);
    this.data[0].data = this.gatherer.temperatureData;
  }

  constructor() {}

}