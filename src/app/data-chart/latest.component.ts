import { Component, OnInit, Input } from '@angular/core';
import { DataGathererService } from '../data-gatherer/data-gatherer.service';

/*
 * ~ Latest Component ~
 * 
 * Component for the real time data
 * 
 */
@Component({
  selector: 'latest-section',
  templateUrl: './latest-template.html',
})
export class LatestComponent implements OnInit {

  // Inputs
  @Input() gatherer: DataGathererService; // The gatherer service

  constructor() {}
  
  // Grabs data on init so it's there right away on page load
  ngOnInit() {
    this.getLastVals();
  }

  // Returns an object with all three most recent values in it
  getLastVals() {
    if (this.gatherer.timestamps.length < 1) return [0, 0, 0];
    return {
      temp: this.gatherer.temperatureData[this.gatherer.temperatureData.length - 1],
      soil: this.gatherer.soilMoistureData[this.gatherer.soilMoistureData.length - 1],
      sun: this.gatherer.sunlightData[this.gatherer.sunlightData.length - 1]
    };
  }

  // Returns the last timestamp in string form
  getLastTimestamp() {
    if (this.gatherer.today != undefined) {
      return this.gatherer.today.toDateString() + ' at ' + this.format(this.gatherer.today);
    } else {
      return "No Data Found";
    }
  }

  // Formats the date strings properly
  format(date: Date) {
    return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  }
}