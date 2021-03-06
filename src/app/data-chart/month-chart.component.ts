import { Component, OnInit, Input } from '@angular/core';
import { interval } from 'rxjs';
import { DataGathererService } from '../data-gatherer/data-gatherer.service';
import { DayDataChunk } from '../data-gatherer/data-objects';
import { faCalendarAlt, faSun, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

/*
 * ~ Month Chart Component ~
 * 
 * Turns the data from the past 30 days pulled off of thingspeak into interactive charts
 * Also provides a view for each individual day
 * 
 */
@Component({
  selector: 'month-data-chart',
  templateUrl: './month-data-chart-template.html',
})
export class MonthChartComponent implements OnInit {

  // Icons
  faCalendarAlt = faCalendarAlt;
  faSun = faSun;
  faTimesCircle = faTimesCircle;

  // Inputs
  @Input() gatherer: DataGathererService; // The gatherer service

  // Member variables
  daysRecorded: number = 0; // Total number of days recorded
  averages: number[] = [-1, -1, -1]; // Array of the averages for the month
  selectedDay: DayDataChunk; // The current day selected for view

  // Refreshes data every second + inits a value
  ngOnInit() {
    if (this.gatherer.days.length < 1) {
      this.selectedDay = new DayDataChunk(undefined, -1, -1, -1);
    } else {
      this.selectedDay = this.gatherer.days[this.gatherer.days.length - 1];
    }
    interval(1000).subscribe(x => {
      this.daysRecorded = this.gatherer.days.length;
      this.averages = this.getAverages();
    });
  }

  // Getsthe averages for all 3 values
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
  
  // Turns a percentage into how much of the day it is in hrs/mins
  avgSunlightDuration(sun: number) {
    let pct = sun / 100;
    let x = pct * 24;
    let y = x % 1 * 60;
    return (x | 0) + 'h ' + (y | 0) + 'm';
  }

  // Changes the selected day (used on menu select)
  changeFocus(day: DayDataChunk) {
    this.selectedDay = day;
  }

  constructor() {}

}