import { Component, OnInit, Input } from '@angular/core';
import { interval } from 'rxjs';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Color, BaseChartDirective } from 'ng2-charts';
import { DataGathererService, IN_SUN_THRESHOLD } from '../data-gatherer/data-gatherer.service';

/*
 * ~ Sunlight Chart Component ~
 * 
 * Turns the sunlight data pulled off of thingspeak into interactive charts
 * 
 */
@Component({
  selector: 'sun-data-chart',
  templateUrl: './line-chart-template.html',
})
export class SunlightChartComponent implements OnInit {

  // Inputs
  @Input() gatherer: DataGathererService; // The gatherer service

  // Inits an empty data set for the chart
  public lineChartData: ChartDataSets[] = [
    { data: [], fill: false, label: 'Sunlight' }
  ];
  // Array for the timestamps (x-axis)
  public timestamps: string[] = [];
  // The chart options object
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {min: 0, max:1000}
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
        yMin: IN_SUN_THRESHOLD, // green zone lower bound
        yMax: 1000,
        backgroundColor: "rgba(46, 204, 113,0.3)"
      }],
    },
  };
  // The colors for the chart
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
  // Other chart settings
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  // Refreshes chart every second
  ngOnInit() {
    interval(1000).subscribe(x => {
      this.refresh();
    });
  }

  // Updates the chart data
  refresh() {
    this.timestamps = this.gatherer.timestamps.map(x => this.format(x));
    this.lineChartData[0].data = this.gatherer.sunlightData;
  }

  // Formats dates into time strings
  format(date: Date) {
    return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  }

  constructor() {}

}