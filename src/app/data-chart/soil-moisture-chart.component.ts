import { Component, OnInit, Input } from '@angular/core';
import { interval } from 'rxjs';
import { DataGathererService } from '../data-gatherer/data-gatherer.service';

/*
 * ~ Soil Moisture Chart Component ~
 * 
 * Turns the soil moisture data pulled off of thingspeak into interactive charts
 * 
 */
@Component({
  selector: 'sm-data-chart',
  templateUrl: './line-chart-template.html',
})
export class SoilMoistureChartComponent implements OnInit {
  
  chartOptions = {
    responsive: true,
    scales: {
      yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0, max:100}}]
    }
  };

  @Input() gatherer: DataGathererService;

  chartType = 'line'
  data = [{ data: [], label: 'Soil Moisture' }];
  timestamps = [];

  ngOnInit() {
    interval(1000).subscribe(x => {
      this.refresh();
    });
  }

  refresh() {
    this.timestamps = this.gatherer.timestamps.map(x => this.format(x));
    this.data[0].data = this.gatherer.soilMoistureData;
  }

  format(date: Date) {
    return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  }

  constructor() {}

}