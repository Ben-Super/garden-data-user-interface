import { Component, OnInit, Input } from '@angular/core';
import { interval } from 'rxjs';
import { DataGathererService } from '../data-gatherer/data-gatherer.service';
import { DayDataChunk } from '../data-gatherer/data-objects';

/*
 * ~ Month Chart Component ~
 * 
 * Turns the data from the past 30 days pulled off of thingspeak into interactive charts
 * 
 */
@Component({
  selector: 'month-data-chart',
  templateUrl: './month-data-chart-template.html',
})
export class MonthChartComponent implements OnInit {

  @Input() gatherer: DataGathererService;

  daysRecorded: number = 0;
  averages: number[] = [-1, -1, -1];

  ngOnInit() {
    interval(1000).subscribe(x => {
      this.daysRecorded = this.gatherer.days.length;
      this.averages = this.getAverages();
    });
  }

  getAverages() {
    if (this.gatherer.days.length < 1) return [-1, -1, -1];
    let sum1 = 0, sum2 = 0, sum3 = 0;
    for(let d of this.gatherer.days) {
      sum1 += d.temperature;
      sum2 += d.soil_moisture;
      sum3 += d.sunlight;
    }
    return [sum1 / this.daysRecorded, sum2 / this.daysRecorded, sum3 / this.daysRecorded];
  }
  
  avgSunlightDuration() {
    let pct = this.averages[2] / 100;
    let x = pct * 24;
    let y = x % 1 * 60;
    return (x | 0) + 'h ' + (y | 0) + 'm';
  }

  constructor() {}

}