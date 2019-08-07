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
  public today: Date;
  public timestamps: string[] = [];
  public temperatureData: number[] = [];
  public soilMoistureData: number[] = [];
  public sunlightData: number[] = [];

  constructor(private rest: RestService) {}

  startGathering() {
    interval(1000).subscribe(x => {
      this.getData();
    });
  }

  storeDay(temp: number[], soil: number[], sun: number[]) {
    this.days.push(new DayDataChunk(
      this.today, 
      temp.reduce(getSum) / temp.length,
      soil.reduce(getSum) / soil.length,
      sun
    ));
    function getSum(total, num) {
      return total + num;
    }
    if (this.days.length > 30) this.days.shift();
  }

  getData() {
    this.rest.get()
      .subscribe(
        result => {
          if (this.isNewData(result[0])) {
            this.today = new Date(result[0].created_at);
            this.timestamps.push(this.format(this.today));
            this.temperatureData.push(parseFloat(result[0].field1));
            this.soilMoistureData.push(parseFloat(result[0].field3));
            this.sunlightData.push(parseFloat(result[0].field4));
          }
        },
        error => console.log("Error >>> " + error)
      )
  }

  isNewData(result) {
    let index = this.timestamps.length - 1;
    if (index < 0) return true;
    return result.field1 != this.temperatureData[index] ||
            result.field3 != this.soilMoistureData[index] ||
            result.field4 != this.sunlightData[index];
  }

  format(date: Date) {
    return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  }

  check() {
    console.log("Gatherer service initialized.");
  }
}
