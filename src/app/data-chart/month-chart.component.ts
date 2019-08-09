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
  selector: 'day-data-chart',
  templateUrl: './day-data-chart-template.html',
})
export class MonthChartComponent implements OnInit {

  @Input() gatherer: DataGathererService;

  daysRecorded: number;

  ngOnInit() {
    this.daysRecorded = this.gatherer.days.length;
  }

  changeFocus(day: DayDataChunk) {
    
  }
  
  // TODO
  // avgSunlightDuration() {
  //   let pct =  / 100;
  //   let x = pct * 24;
  //   let y = x % 1 * 60;
  //   return (x | 0) + 'h ' + (y | 0) + 'm';
  // }

  constructor() {}

}