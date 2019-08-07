import { Component, OnInit, Input } from '@angular/core';
import { interval } from 'rxjs';
import { DataGathererService } from '../data-gatherer/data-gatherer.service';

/*
 * ~ Day Chart Component ~
 * 
 * Turns the data from past days pulled off of thingspeak into interactive charts
 * 
 */
@Component({
  selector: 'day-data-chart',
  templateUrl: './line-chart-template.html',
})
export class DayChartComponent implements OnInit {
  
  chartOptions = {
    responsive: true,
    scales: {
      yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0, max:100}}]
    }
  };

  @Input() gatherer: DataGathererService;

  chartType = 'pie'
  data = [{ data: [], label: 'Sunlight' }];
  timestamps = [];

  ngOnInit() {
    interval(1000).subscribe(x => {
      this.refresh();
    });
  }

  refresh() {
    
  }

  constructor() {}

}