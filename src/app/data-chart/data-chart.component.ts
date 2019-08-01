
import {Component} from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-data-chart',
    templateUrl: './data-chart.component.html',
    providers: [MessageService]
})
export class DataChartComponent {

    data: any;

    constructor(private messageService: MessageService) {
        this.data = {
            labels: [1, 2, 3, 4, 5],
            datasets: [
                {
                    label: 'Temperature',
                    data: [1,2,3,4,5],
                    fill: false,
                    borderColor: '#4bc0c0'
                },
                {
                    label: 'Sunlight',
                    data: [5,4,3,2,1],
                    fill: false,
                    borderColor: '#a8324e'
                },
                {
                    label: 'Soil Moisture',
                    data: [1,5,1,5,1],
                    fill: false,
                    borderColor: '#32a861'
                }
            ]
        }
    }

    selectData(event) {
        this.messageService.add({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
    }

    update(event) {
      
    }
}