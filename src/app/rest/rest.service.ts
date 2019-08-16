import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ThingSpeakData } from './response-interface';

const endpoint = 'https://api.thingspeak.com/channels/500326/';

/*
 * ~ Rest Service ~
 * 
 * Retrieves the data from thingspeak and returns observables to the gatherer
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(protected http: HttpClient) {}

  // Gets the most recent piece of data
  get(): Observable<ThingSpeakData> {
      return this.http
          .get<ThingSpeakData>(endpoint + 'feeds.json?results=1');
  }

  // Gets the last numFeeds readings (numFeeds is chosen by the param)
  getMany(numFeeds: number): Observable<ThingSpeakData> {
    return this.http
          .get<ThingSpeakData>(endpoint + 'feeds.json?results=' + numFeeds);
  }
}
