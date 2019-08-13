import { Injectable } from '@angular/core';
import { DayDataChunk } from './data-objects';
import { ThingSpeakData } from '../rest/response-interface';
import { RestService } from '../rest/rest.service';
import { interval } from 'rxjs';

/*
 * ~ Data Gatherer ~
 * 
 * Retrieves the data from the rest service and puts it into easy to track arrays
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class DataGathererService {

  public days: DayDataChunk[] = [];
  public today: Date = new Date();
  public timestamps: Date[] = [];
  public temperatureData: number[] = [];
  public soilMoistureData: number[] = [];
  public sunlightData: number[] = [];

  constructor(private rest: RestService) {}

  startGathering() {
    interval(1000).subscribe(x => {
      this.getData();
    });
  }

  getData() {
    this.rest.get()
      .subscribe(
        result => {
          if (this.isNewDay(result[0])) this.storeDay();
          if (this.isNewData(result[0])) {
            this.today = new Date(result[0].created_at);
            this.timestamps.push(this.today);
            this.temperatureData.push(parseFloat(result[0].field1));
            this.soilMoistureData.push(parseFloat(result[0].field3));
            this.sunlightData.push(parseFloat(result[0].field6));
          }
        },
        error => console.log("Error >>> " + error)
      )
  }

  clearData() {
    this.today = new Date();
    this.timestamps = [];
    this.temperatureData = [];
    this.soilMoistureData = [];
    this.sunlightData = [];
  }

  isNewData(result) {
    let date1 = new Date(result.created_at);
    if (this.timestamps.length - 1 < 0) return true;
    let date2 = this.timestamps[this.timestamps.length - 1];
    return date1.getTime() != date2.getTime();
  }

  isNewDay(result) {
    let date = new Date(result.created_at);
    return this.today.getMonth() != date.getMonth() ||
            this.today.getDate() != date.getDate() ||
            this.today.getFullYear() != date.getFullYear();
  }

  storeDay() {
    this.days.push(new DayDataChunk(
      this.today, 
      this.temperatureData.reduce(getSum) / this.temperatureData.length,
      this.soilMoistureData.reduce(getSum) / this.soilMoistureData.length,
      this.calculateSunlight()
    ));
    function getSum(total, num) {
      return total + num;
    }
    if (this.days.length > 30) this.days.shift();
    this.clearData();
  }

  calculateSunlight() {
    let count = 0;
    for (let n of this.sunlightData) {
      if (n >= 500) ++count;
    }
    return count / 96;
  }

  check() {
    console.log("Gatherer service initialized.");
  }
}
