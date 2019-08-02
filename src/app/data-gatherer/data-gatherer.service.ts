import { Injectable, OnInit } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { DataChunk, DayDataChunk, ChartData } from './data-objects';

/*
 * ~ Data Gatherer ~
 * 
 * Retrieves the data from the rest service and puts it into easy to track arrays
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class DataGathererComponent implements OnInit {

  public currentData: ChartData; // data from the current day
  public pastData: DayDataChunk[] = []; // stored data summary from past days
  private temperatureTotal: number = 0; // total temp recorded for avg temp
  private soilMoistureTotal: number = 0; // total sm recorded for avg sm
  private sunlightData: number[] = []; // all the sunlight data from the current day

  constructor(public rest: RestService) {
    this.currentData = new ChartData();
  }

  ngOnInit() {
    
  }

  /*
   * Adds a data chunk to the current day if there is a new one from the rest service
   * Stores the data from this day and resets the current data to empty if a new day has been reached
   */
  update() {
    this.rest.updateData();
    if (this.rest.response != undefined) {
      let data = new DataChunk(this.rest.response);
      if (false && this.isNewDay(data)) { // disabled temporarily
        this.storeOldData();
        this.currentData.resetData();
        this.sunlightData = [];
        this.soilMoistureTotal = 0;
        this.temperatureTotal = 0;
      }
      if (true || this.isNewData(data)) { // temporarily always true
        this.temperatureTotal += data.temperature;
        this.soilMoistureTotal += data.soil_moisture;
        this.sunlightData.push(data.sunlight);
        this.currentData.pushData(data);
      }
    }
  }

  /*
   * Checks the date to see if a new day has been reached
   */
  isNewDay(data: any) {
    if (this.currentData.getSize() == 0) return false;
    let temp1 = new Date(data.date.toDateString());
    let temp2 = new Date(this.currentData.getLastDate().toDateString());
    return temp1 != temp2;
  }

  /*
   * Checks the entire timestamp to see if the data is new (i.e. not timestamped the same as the last one)
   */
  isNewData(data: any) {
    if (this.currentData.getSize() == 0) return true;
    return data.date == this.currentData.getLastDate();
  }

  /*
   * Stores the data from the current day to the daily storage array
   * Deletes some data if the array is getting too big
   */
  storeOldData() {
    if (this.pastData.length >= 100) {
      this.pastData.shift();
    }
    let div = this.currentData.getSize();
    this.pastData.push(new DayDataChunk(
      new Date(this.currentData.getLastDate().toDateString()),
      this.temperatureTotal / div,
      this.soilMoistureTotal / div,
      this.sunlightData)
    );
  }
}
