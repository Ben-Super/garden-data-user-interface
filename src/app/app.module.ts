import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  MatTabsModule,
  MatToolbarModule,
  MatMenuModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemperatureChartComponent } from './data-chart/temperature-chart.component';
import { SoilMoistureChartComponent } from './data-chart/soil-moisture-chart.component';
import { SunlightChartComponent } from './data-chart/sunlight-chart.component';
import { LatestComponent } from './data-chart/latest.component';
import { MonthChartComponent } from './data-chart/month-chart.component';

@NgModule({
  declarations: [
    AppComponent, 
    TemperatureChartComponent, 
    SoilMoistureChartComponent, 
    SunlightChartComponent,
    LatestComponent,
    MonthChartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    HttpClientModule, 
    ChartsModule, 
    MatTabsModule, 
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FlexLayoutModule,
    FontAwesomeModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
