import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ThingSpeakData } from './response-interface';

const endpoint = 'https://api.thingspeak.com/channels/500326/';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(protected http: HttpClient) {}

  get(): Observable<ThingSpeakData> {
      let temp = this.http
          .get<ThingSpeakData>(endpoint + 'feeds.json?results=1');
      console.log(temp);
      return temp;
  }
}
