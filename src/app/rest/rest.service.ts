import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import { Observable } from "rxjs/Observable";
 import "rxjs/Rx";
import { ThingSpeakData } from './response-interface';

const endpoint = 'https://api.thingspeak.com/channels/500326/';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  response: any;

  constructor(private http: Http) {}

  get(): Observable<ThingSpeakData[]> {
      return this.http
             .get(endpoint + 'feeds.json?results=1')
             .map((response: Response) => {
                 return <ThingSpeakData[]>response.json();
             })
             .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
