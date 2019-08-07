import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemperatureChartComponent } from './data-chart/temperature-chart.component';
import { SoilMoistureChartComponent } from './data-chart/soil-moisture-chart.component';
import { SunlightChartComponent } from './data-chart/sunlight-chart.component';
import { DayChartComponent } from './data-chart/day-chart.component';

@NgModule({
  declarations: [
    AppComponent, 
    TemperatureChartComponent, 
    SoilMoistureChartComponent, 
    SunlightChartComponent,
    DayChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    HttpModule, 
    ChartsModule, 
    MatTabsModule, 
    MatToolbarModule,
    MatMenuModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
