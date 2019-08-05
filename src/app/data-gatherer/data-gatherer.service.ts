import { Injectable, OnInit } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { DataChunk, DayDataChunk, ChartData } from './data-objects';
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
export class DataGathererService implements OnInit {

  public timestamps: Date[] = []; // all the date data for the current day
  public temperatureData: number[] = []; // all the temperature data for the current day
  public soilMoistureData: number[] = []; // all the soil moisture data for the current day
  public sunlightData: number[] = []; // all the sunlight data from the current day

  constructor(public rest: RestService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.rest.get()
      .subscribe(
        resultArray => {
          this.timestamps.push(new Date(resultArray[0].feeds[0].created_at));
          this.temperatureData.push(parseFloat(resultArray[0].feeds[0].field1));
          this.soilMoistureData.push(parseFloat(resultArray[0].feeds[0].field3));
          this.sunlightData.push(parseFloat(resultArray[0].feeds[0].field4));
        },
        error => console.log("Error >>> " + error)
      )
  }
}
