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

/*
 * Helper class to store the data in a way that the chart library can read
 */
@Injectable({
  providedIn: 'root'
})
export class ChartData {
  public data: any;
  private size: number;
  private lastEntry: DataChunk;

  public constructor() {
    this.resetData();
  }
  
  // Clears all the data
  public resetData() {
    this.size = 0;
    this.lastEntry = undefined;
    this.data = {
      labels: [],
      datasets: [
        {
          data: [],
        },
        {
          data: [],
        },
        {
          data: [],
        }
      ]
    }
  }

  // Adds new data to the chart data
  public pushData(newData: DataChunk) {
    this.data.labels.push()
    this.data.labels.push(this.formatTime(newData.date));
    this.data.datasets[0].data.push(newData.temperature);
    this.data.datasets[1].data.push(newData.soil_moisture);
    this.data.datasets[2].data.push(newData.sunlight);
    this.size += 1;
    this.lastEntry = newData;
  }

  // Formats time into HH:MM
  private formatTime(date: Date) {
    return date.getHours() + ':' + date.getMinutes()
  }

  // Returns the date from the last entry
  public getLastDate() {
    if (this.lastEntry != undefined) return this.lastEntry.date;
    else return undefined;
  }

  // Returns the entire last entry as a DataChunk
  public getLastEntry() {
    if (this.lastEntry != undefined) return this.lastEntry;
    else return undefined;
  }

  // Returns the size of the data (number of recordings)
  public getSize() {
    return this.size;
  }
}