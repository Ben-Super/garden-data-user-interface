import { Component, OnInit, Input } from '@angular/core';
import { interval } from 'rxjs';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Color, BaseChartDirective } from 'ng2-charts';
import { DataGathererService, TEMP_UPPER_THRESHOLD, TEMP_LOWER_THRESHOLD } from '../data-gatherer/data-gatherer.service';
import { UserSettingsService } from '../user-settings/user-settings.service';

/*
 * ~ Sunlight Chart Component ~
 * 
 * Turns the sunlight data pulled off of thingspeak into interactive charts
 * 
 */
@Component({
  selector: 'temp-data-chart',
  templateUrl: './line-chart-template.html',
})
export class TemperatureChartComponent implements OnInit {

  @Input() gatherer: DataGathererService;
  @Input() settings: UserSettingsService;

  public lineChartData: ChartDataSets[] = [
    { data: [], fill: false, label: 'Temperature' }
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
          ticks: {min: 0, max:120}
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
        yMin: this.settings.tempLower.value,
        yMax: this.settings.tempUpper.value,
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
    this.lineChartData[0].data = this.gatherer.temperatureData;
  }

  format(date: Date) {
    return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  }

  constructor() {}

}