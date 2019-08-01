import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const endpoint = 'https://api.thingspeak.com/channels/500326/';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  response: any;

  constructor(private http: HttpClient) {}

  updateData() {
    this.http
      .get(endpoint + 'feeds.json?results=1')
      .subscribe(result => (this.response = result));
  }

  // TODO implement this
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
