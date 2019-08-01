import { Injectable } from '@angular/core';

/*
 * Helper class to make data retrieved from ThingSpeak easier to work with
 */
@Injectable({
  providedIn: 'root'
})
export class DataChunk {
  date: Date;
  temperature: number;
  soil_moisture: number;
  sunlight: number;

  constructor(data) {
    let temp = data.feeds[0];
    this.parse(temp.created_at, temp.field1, temp.field3, temp.field4);
  }

  parse(d: string, t: string, sm: string, sn: string) {
    this.date = new Date(d);
    this.temperature = parseFloat(t);
    this.soil_moisture = parseFloat(sm);
    this.sunlight = parseFloat(sn);
  }

  toString() {
    return "Date: " + this.date.toDateString() + "\n" +
    "Time: " + this.date.toTimeString() + "\n" +
    "Temperature: " + this.temperature + "\n" +
    "Soil Moisture: " + this.soil_moisture + "\n" +
    "Sunlight: " + this.sunlight;
  }
}

/*
 * Helper class to make data from an entire day easier to work with
 */
@Injectable({
  providedIn: 'root'
})
export class DayDataChunk {
  date: Date;
  temperature: number;
  soil_moisture: number;
  sunlight: number[];

  constructor(d: Date, t: number, sm: number, sn: number[]) {
    this.date = d;
    this.temperature = t;
    this.soil_moisture = sm;
    this.sunlight = sn;
  }
}