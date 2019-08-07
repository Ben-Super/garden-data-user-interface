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
    this.selectedDay = this.gatherer.days[this.gatherer.days.length - 1];
    this.sunData = [this.selectedDay.sunlight, 100 - this.selectedDay.sunlight];
  }

  changeFocus(day: DayDataChunk) {
    this.selectedDay = day;
    this.sunData = [this.selectedDay.sunlight, 100 - this.selectedDay.sunlight];
  }

  constructor() {}

}