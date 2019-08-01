import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { interval } from 'rxjs';

import { DataChunk, DayDataChunk } from './data-chunk';

@Component({
  selector: 'app-data-gatherer',
  templateUrl: './data-gatherer.component.html',
  styleUrls: ['./data-gatherer.component.css']
})
export class DataGathererComponent implements OnInit {

  currentData: DataChunk[];
  pastData: DayDataChunk[];
  temperatureTotal: number = 0;
  soilMoistureTotal: number = 0;
  sunlightData: number[] = [];

  constructor(public rest: RestService) {}

  ngOnInit() {
    interval(5000).subscribe(x => {
      this.update();
    });
  }

  update() {
    this.rest.updateData();
    let data = new DataChunk(this.rest.response);
    if (this.isNewDay(data)) {
      this.storeOldData();
      this.currentData = [];
      this.sunlightData = [];
    }
    if (this.isNewData(data)) {
      this.temperatureTotal += data.temperature;
      this.soilMoistureTotal += data.soil_moisture;
      this.sunlightData.push(data.sunlight);
      this.currentData.push(data);
    }
  }

  isNewDay(data: any) {
    let temp1 = new Date(data.date.toDateString());
    let temp2 = new Date(this.currentData[this.currentData.length - 1].date.toDateString());
    return temp1 === temp2;
  }

  isNewData(data: any) {
    return data.date == this.currentData[this.currentData.length - 1].date;
  }

  storeOldData() {
    if (this.pastData.length >= 100) {
      this.pastData.shift();
    }
    let div = this.currentData.length;
    this.pastData.push(new DayDataChunk(
      new Date(this.currentData[this.currentData.length - 1].date.toDateString()),
      this.temperatureTotal / div,
      this.soilMoistureTotal / div,
      this.sunlightData)
    );
  }
}
