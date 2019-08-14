import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ThingSpeakData } from './response-interface';

const endpoint = 'https://api.thingspeak.com/channels/500326/';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(protected http: HttpClient) {}

  get(): Observable<ThingSpeakData> {
      return this.http
          .get<ThingSpeakData>(endpoint + 'feeds.json?results=1');
  }

  getMany(numFeeds: number): Observable<ThingSpeakData> {
    return this.http
          .get<ThingSpeakData>(endpoint + 'feeds.json?results=' + numFeeds);
  }
}
