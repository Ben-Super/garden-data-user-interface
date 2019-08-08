import { Component, OnInit, Input } from '@angular/core';
import { DataGathererService } from '../data-gatherer/data-gatherer.service';

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
    return [
      this.gatherer.temperatureData[this.gatherer.temperatureData.length - 1],
      this.gatherer.soilMoistureData[this.gatherer.soilMoistureData.length - 1],
      this.gatherer.sunlightData[this.gatherer.sunlightData.length - 1]
    ];
  }
}