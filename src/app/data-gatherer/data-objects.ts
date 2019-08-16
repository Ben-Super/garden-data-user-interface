import { Injectable } from '@angular/core';

/*
 * Helper class to make data from an entire day easier to work with
 */
@Injectable({
  providedIn: 'root'
})
export class DayDataChunk {
  date: Date; // Date the data is from
  temperature: number; // Average temperature for the day
  soil_moisture: number; // Avesrage soil moisture for the day
  sunlight: number; // Percent of time the device was in the sun during this day

  constructor(d: Date, t: number, sm: number, sn: number) {
    this.date = d;
    this.temperature = t;
    this.soil_moisture = sm;
    this.sunlight = sn;
  }
}