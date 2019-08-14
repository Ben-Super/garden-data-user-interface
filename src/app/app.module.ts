import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemperatureChartComponent } from './data-chart/temperature-chart.component';
import { SoilMoistureChartComponent } from './data-chart/soil-moisture-chart.component';
import { SunlightChartComponent } from './data-chart/sunlight-chart.component';
import { LatestComponent } from './data-chart/latest.component';
import { DayChartComponent } from './data-chart/day-chart.component';
import { MonthChartComponent } from './data-chart/month-chart.component';

@NgModule({
  declarations: [
    AppComponent, 
    TemperatureChartComponent, 
    SoilMoistureChartComponent, 
    SunlightChartComponent,
    LatestComponent,
    DayChartComponent,
    MonthChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    HttpClientModule, 
    ChartsModule, 
    MatTabsModule, 
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    FlexLayoutModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
