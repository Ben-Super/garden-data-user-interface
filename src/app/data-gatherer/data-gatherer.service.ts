import { Injectable } from '@angular/core';
import { DayDataChunk } from './data-objects';
import { ThingSpeakData } from '../rest/response-interface';
import { RestService } from '../rest/rest.service';
import { interval } from 'rxjs';

export const IN_SUN_THRESHOLD = 500;
export const IN_SHADE_THRESHOLD = 50;
export const SOIL_UPPER_THRESHOLD = 60;
export const SOIL_LOWER_THRESHOLD = 20;
export const TEMP_UPPER_THRESHOLD = 90;
export const TEMP_LOWER_THRESHOLD = 60;
const REFRESH_RATE = 1000;
const NUM_VALS_ON_STARTUP = 100;

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

  public days: DayDataChunk[] = []; // Data storage for past days
  public today: Date = new Date(); // Current day
  public timestamps: Date[] = []; // Timestamps for the readings
  public temperatureData: number[] = []; // Temperature readings
  public soilMoistureData: number[] = []; // Soil moisture readings
  public sunlightData: number[] = []; // Sunlight readings

  constructor(private rest: RestService) {}

  // Begins refreshing the data every second
  startGathering() {
    this.init();
    interval(REFRESH_RATE).subscribe(x => {
      this.getData();
    });
  }

  // Retrieves the last reading and sends it to the handler
  getData() {
    this.rest.get()
      .subscribe(
        result => {
          this.handleResult(result);
        },
        error => console.log("Error >>> " + error)
      )
  }

  // Populates the data storage with old data on initialization
  init() {
    this.rest.getMany(NUM_VALS_ON_STARTUP)
      .subscribe(
        result => {
          this.handleResult(result);
        },
        error => console.log("Error >>> " + error)
      )
  }

  // Handles new readings and updates the data accordingly
  handleResult(result) {
    if (this.isNewData(result.feeds[result.feeds.length - 1])) {
      for (let i = 0; i < result.feeds.length; ++i) {
        if (this.isNewDay(result.feeds[i])) this.storeDay();
        this.today = new Date(result.feeds[i].created_at);
        this.timestamps.push(this.today);
        let temp = parseFloat(result.feeds[i].field1);
        this.temperatureData.push(!isNaN(temp) ? 
          temp : this.temperatureData[this.temperatureData.length - 1]);
        let soil = parseFloat(result.feeds[i].field3);
        this.soilMoistureData.push(!isNaN(soil) ? 
          soil : this.soilMoistureData[this.soilMoistureData.length - 1]);
        this.sunlightData.push(parseFloat(result.feeds[i].field6));
      }
    }
  }

  // Data reset for when a new day has been reached
  clearData() {
    this.today = new Date();
    this.timestamps = [];
    this.temperatureData = [];
    this.soilMoistureData = [];
    this.sunlightData = [];
  }

  // Checks to see if a reading is new
  isNewData(result) {
    let date1 = new Date(result.created_at);
    if (this.timestamps.length - 1 < 0) return true;
    let date2 = this.timestamps[this.timestamps.length - 1];
    return date1.getTime() != date2.getTime();
  }

  // Chaecks to see if a new day has been reached
  isNewDay(result) {
    if (this.timestamps.length < 1) return false;
    let date = new Date(result.created_at);
    return this.today.getMonth() != date.getMonth() ||
            this.today.getDate() != date.getDate() ||
            this.today.getFullYear() != date.getFullYear();
  }

  // Stores the data from the current day and resets the day to the new one
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

  // Calculates the percent of the day the device was in the sun
  calculateSunlight() {
    let count = 0;
    for (let n of this.sunlightData) {
      if (n >= IN_SUN_THRESHOLD) ++count;
    }
    return count * 100 / 96.0;
  }

  // Returns statuses based on the temperature
  isGoodTemp(temp: number) {
    if (this.timestamps.length < 1 || temp < 1) {
      return 'No Data';
    } else if (temp < TEMP_LOWER_THRESHOLD) {
      return 'Too Cold';
    } else if (temp > TEMP_UPPER_THRESHOLD) {
      return 'Too Hot';
    } else {
      return 'Good';
    }
  }

  // Returns statuses based on the soil moisture
  isGoodMoisture(soil: number) {
    if (this.timestamps.length < 1 || soil < 1) {
      return 'No Data';
    } else if (soil < SOIL_LOWER_THRESHOLD) {
      return 'Too Dry';
    } else if (soil > SOIL_UPPER_THRESHOLD) {
      return 'Too Wet';
    } else {
      return 'Good';
    }
  }

  // Returns statuses based on the sunlight
  isInSun(sun: number) {
    if (this.timestamps.length < 1 || sun < 1) {
      return 'No Data';
    } else if (sun >= IN_SUN_THRESHOLD) {
      return 'Sunny';
    } else if (sun >= IN_SHADE_THRESHOLD) {
      return 'Cloudy / Shady';
    } else {
      return 'Night';
    }
  }
}