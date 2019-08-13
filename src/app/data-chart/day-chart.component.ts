import { Component, OnInit, Input } from '@angular/core';
import { interval } from 'rxjs';
import { DataGathererService } from '../data-gatherer/data-gatherer.service';
import { DayDataChunk } from '../data-gatherer/data-objects';

/*
 * ~ Day Chart Component ~
 * 
 * Turns the data from past days pulled off of thingspeak into interactive charts
 * 
 */
@Component({
  selector: 'day-data-chart',
  templateUrl: './day-data-chart-template.html',
})
export class DayChartComponent implements OnInit {

  @Input() gatherer: DataGathererService;

  chartOptions = {
    responsive: true,
  };
  sunData = [];
  labels = ['Sun', 'No Sun'];
  selectedDay: DayDataChunk;

  ngOnInit() {
    if (this.gatherer.days.length < 1) {
      this.selectedDay = new DayDataChunk(new Date(), 0, 0, 0);
    } else {
      this.selectedDay = this.gatherer.days[this.gatherer.days.length - 1];
    }
  }

  changeFocus(day: DayDataChunk) {
    this.selectedDay = day;
  }

  percentToDuration() {
    let pct = this.selectedDay.sunlight;
    let x = pct * 24;
    let y = x % 1 * 60;
    return (x | 0) + 'h ' + (y | 0) + 'm';
  }

  constructor() {}

}