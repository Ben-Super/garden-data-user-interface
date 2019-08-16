import { Component, OnInit, Input } from '@angular/core';
import { DataGathererService } from '../data-gatherer/data-gatherer.service';
import {
  faTint,
  faTintSlash,
  faSun,
  faCloud,
  faSnowflake,
  faCheckCircle,
  faMoon,
  faFireAlt
} from '@fortawesome/free-solid-svg-icons';

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

  faTint = faTint;
  faTintSlash = faTintSlash;
  faSun = faSun;
  faCloud = faCloud;
  faSnowflake = faSnowflake;
  faCheckCircle = faCheckCircle;
  faMoon = faMoon;
  faFireAlt = faFireAlt;

  constructor() {}

  ngOnInit() {
    this.getLastVals();
  }

  getLastVals() {
    if (this.gatherer.timestamps.length < 1) return [0, 0, 0];
    return {
      temp: this.gatherer.temperatureData[this.gatherer.temperatureData.length - 1],
      soil: this.gatherer.soilMoistureData[this.gatherer.soilMoistureData.length - 1],
      sun: this.gatherer.sunlightData[this.gatherer.sunlightData.length - 1]
    };
  }

  getLastTimestamp() {
    if (this.gatherer.today != undefined) {
      return this.gatherer.today.toDateString() + ' at ' + this.format(this.gatherer.today);
    } else {
      return "No Data Found";
    }
  }

  format(date: Date) {
    return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  }
}