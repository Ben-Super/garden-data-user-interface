import { Component, OnInit, Input } from '@angular/core';
import { DataGathererService, IN_SUN_THRESHOLD } from '../data-gatherer/data-gatherer.service';

/*
 * ~ Latest Component ~
 * 
 * 
 * 
 */
@Component({
  selector: 'latest-section',
  templateUrl: './latest-template.html',
})
export class LatestComponent implements OnInit {

  @Input() gatherer: DataGathererService;

  constructor() {}

  ngOnInit() {
    this.getLastVals();
  }

  getLastVals() {
    if (this.gatherer.timestamps.length < 1) return [0, 0, 0];
    return [
      this.gatherer.temperatureData[this.gatherer.temperatureData.length - 1],
      this.gatherer.soilMoistureData[this.gatherer.soilMoistureData.length - 1],
      this.gatherer.sunlightData[this.gatherer.sunlightData.length - 1]
    ];
  }

  getLastTimestamp() {
    if (this.gatherer.today != undefined) {
      return this.gatherer.today.toDateString() + ' at ' + this.format(this.gatherer.today);
    } else {
      return "No Data Found";
    }
  }

  isInSun() {
    return this.gatherer.sunlightData[this.gatherer.sunlightData.length - 1] >= IN_SUN_THRESHOLD ? 
    'Yes' : 'No';
  }

  format(date: Date) {
    return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  }
}