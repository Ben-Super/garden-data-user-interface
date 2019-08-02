import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {ChartModule} from 'primeng/chart';
import {ButtonModule} from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataChartComponent } from './data-chart/data-chart.component';

@NgModule({
  declarations: [AppComponent, DataChartComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ChartModule, ButtonModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
