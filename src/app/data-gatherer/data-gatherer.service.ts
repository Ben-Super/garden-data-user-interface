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

  public days: DayDataChunk[] = [
    new DayDataChunk(
      new Date("2019-08-06"),
      22.6,
      17.8,
      19.7
    ),
    new DayDataChunk(
      new Date("2019-08-07"),
      72.6,
      19.8,
      49.7
    ),
  ];
  public today: Date;
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
    return 50;
    // TODO make this actually return a real value
  }

  getData() {
    this.rest.get()
      .subscribe(
        result => {
          if (this.isNewData(result[0])) {
            this.today = new Date(result[0].created_at);
            this.timestamps.push(this.today);
            this.temperatureData.push(parseFloat(result[0].field1));
            this.soilMoistureData.push(parseFloat(result[0].field3));
            this.sunlightData.push(parseFloat(result[0].field4));
          }
        },
        error => console.log("Error >>> " + error)
      )
  }

  clearData() {
    this.today = undefined;
    this.timestamps = [];
    this.temperatureData = [];
    this.soilMoistureData = [];
    this.sunlightData = [];
  }

  isNewData(result) {
    let index = this.timestamps.length - 1;
    if (index < 0) return true;
    return result.field1 != this.temperatureData[index] ||
            result.field3 != this.soilMoistureData[index] ||
            result.field4 != this.sunlightData[index];
  }

  check() {
    console.log("Gatherer service initialized.");
  }
}
