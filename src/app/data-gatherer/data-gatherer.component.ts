import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-data-gatherer',
  templateUrl: './data-gatherer.component.html',
  styleUrls: ['./data-gatherer.component.css']
})
export class DataGathererComponent implements OnInit {
  data: any = [];
  lastOut: any = this.retrieveData();

  constructor(public rest: RestService) {}

  ngOnInit() {
    interval(5000).subscribe(x => {
      this.lastOut = this.retrieveData();
      console.log(this.lastOut.feeds[0]);
    });
  }

  retrieveData() {
    this.rest.updateData();
    if (this.data.length >= 50) {
      this.data.shift();
    }
    this.data.push(this.rest.response);
    return this.rest.response;
  }
}
