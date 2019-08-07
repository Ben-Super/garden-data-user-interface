import { Component, OnInit } from '@angular/core';
import { DataGathererService } from './data-gatherer/data-gatherer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'garden-data-ui';
  
  constructor(private gatherer: DataGathererService) {}

  ngOnInit() {
    this.gatherer.startGathering();
  }
}
