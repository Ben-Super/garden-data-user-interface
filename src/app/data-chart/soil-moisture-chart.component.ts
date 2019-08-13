import { Component, OnInit, Input } from '@angular/core';
import { interval } from 'rxjs';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Color, BaseChartDirective } from 'ng2-charts';
import { DataGathererService } from '../data-gatherer/data-gatherer.service';

/*
 * ~ Soil Moisture Chart Component ~
 * 
 * Turns the soil moisture data pulled off of thingspeak into interactive charts
 * 
 */
@Component({
  selector: 'sm-data-chart',
  templateUrl: './line-chart-template.html',
})
export class SoilMoistureChartComponent implements OnInit {

  @Input() gatherer: DataGathererService;

  public lineChartData: ChartDataSets[] = [
    { data: [], fill: false, label: 'Sunlight' }
  ];
  public timestamps: string[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {min: 0, max:100}
        },
      ]
    },
    annotation: {
      annotations: [{
        drawTime: "beforeDatasetsDraw",
        type: "box",
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        borderWidth: 0,
        yMin: 20,
        yMax: 60,
        backgroundColor: "rgba(46, 204, 113,0.3)"
      }],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  ngOnInit() {
    interval(1000).subscribe(x => {
      this.refresh();
    });
  }

  refresh() {
    this.timestamps = this.gatherer.timestamps.map(x => this.format(x));
    this.lineChartData[0].data = this.gatherer.soilMoistureData;
  }

  format(date: Date) {
    return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  }

  constructor() {}

}