import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { DataChunk, DayDataChunk } from './data-chunk';
import { interval } from 'rxjs';

const UPDATE_INTERVAL = 5000;

@Component({
  selector: 'app-data-gatherer',
  templateUrl: './data-gatherer.component.html',
  styleUrls: ['./data-gatherer.component.css']
})
export class DataGathererComponent implements OnInit {

  currentData: DataChunk[] = []; // data from the current day
  pastData: DayDataChunk[] = []; // stored data summary from past days
  temperatureTotal: number = 0; // total temp recorded for avg temp
  soilMoistureTotal: number = 0; // total sm recorded for avg sm
  sunlightData: number[] = []; // all the sunlight data from the current day

  constructor(public rest: RestService) {}

  /*
   * Updates the data on a provided interval
   */
  ngOnInit() {
    this.update();
    interval(UPDATE_INTERVAL).subscribe(x => {
      this.update();
    });
  }

  /*
   * Adds a data chunk to the current day if there is a new one from the rest service
   * Stores the data from this day and resets the current data to empty if a new day has been reached
   */
  update() {
    this.rest.updateData();
    if (this.rest.response != undefined) {
      let data = new DataChunk(this.rest.response);
      console.log(data.toString());
      if (this.pastData.length != 0 && this.isNewDay(data)) {
        this.storeOldData();
        this.currentData = [];
        this.sunlightData = [];
      }
      if (this.currentData.length != 0 && this.isNewData(data)) {
        this.temperatureTotal += data.temperature;
        this.soilMoistureTotal += data.soil_moisture;
        this.sunlightData.push(data.sunlight);
        this.currentData.push(data);
      }
    }
  }

  /*
   * Checks the date to see if a new day has been reached
   */
  isNewDay(data: any) {
    let temp1 = new Date(data.date.toDateString());
    let temp2 = new Date(this.currentData[this.currentData.length - 1].date.toDateString());
    return temp1 === temp2;
  }

  /*
   * Checks the entire timestamp to see if the data is new (i.e. not timestamped the same as the last one)
   */
  isNewData(data: any) {
    return data.date == this.currentData[this.currentData.length - 1].date;
  }

  /*
   * Stores the data from the current day to the daily storage array
   * Deletes some data if the array is getting too big
   */
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
