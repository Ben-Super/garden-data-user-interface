
import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import { interval } from 'rxjs';

import { DataGathererComponent } from '../data-gatherer/data-gatherer.service';

const UPDATE_INTERVAL = 1000;

@Component({
    selector: 'app-data-chart',
    templateUrl: './data-chart.component.html',
    providers: [MessageService]
})
export class DataChartComponent implements OnInit{

    ngOnInit() {
      interval(UPDATE_INTERVAL).subscribe(x => {
        this.gatherer.update();
      });
    }

    data: any;

    constructor(private messageService: MessageService, private gatherer: DataGathererComponent) {
        this.data = this.gatherer.currentData;
    }

    selectData(event) {
        this.messageService.add({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
    }
}