
import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import { interval } from 'rxjs';

import { DataGathererComponent } from '../data-gatherer/data-gatherer.service';

const UPDATE_INTERVAL = 1000;

/*
 * ~ Chart Component ~
 * 
 * Turns the data pulled off of thingspeak into interactive charts
 * 
 */
@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  providers: [MessageService]
})
export class DataChartComponent implements OnInit{
  
  data: any; // The data for the chart
  responsive: boolean = true; // Dynamic resizing enabled

  // Refreshes the data every second
  ngOnInit() {
    this.refresh();
  }

  // Makes the data into an empty frame
  constructor(private messageService: MessageService, private gatherer: DataGathererComponent) {
    this.data = {
      labels: [],
      datasets: [
        {
          label: 'Temperature',
          data: [],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Sunlight',
          data: [],
          fill: false,
          borderColor: '#a8324e'
        },
        {
          label: 'Soil Moisture',
          data: [],
          fill: false,
          borderColor: '#32a861'
        }
      ]
    }
  }

  // Grabs the data from the ChartData object and assigns it to this chart
  refresh(event) {
    this.gatherer.update();
    let newData = this.gatherer.currentData.data;
    this.data.labels = newData.labels;
    this.data.datasets[0].data = newData.datasets[0].data;
    this.data.datasets[1].data = newData.datasets[1].data;
    this.data.datasets[2].data = newData.datasets[2].data;
  }

  // Lets you hide certain fields on click
  selectData(event) {
    this.messageService.add({severity: 'info', summary: 'Data Selected', 'detail': 
    this.data.datasets[event.element._datasetIndex].data[event.element._index]});
  }
}