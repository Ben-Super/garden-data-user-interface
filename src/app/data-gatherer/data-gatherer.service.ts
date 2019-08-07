import { Injectable } from '@angular/core';
import { DayDataChunk } from './data-objects';
import { ThingSpeakData } from '../rest/response-interface';

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

  constructor() {}

  storeDay(date: Date, temp: number[], soil: number[], sun: number[]) {
    this.days.push(new DayDataChunk(
      date, 
      temp.reduce(getSum) / temp.length,
      soil.reduce(getSum) / soil.length,
      sun
    ));
    function getSum(total, num) {
      return total + num;
    }
    if (this.days.length > 30) this.days.shift();
  }
}
