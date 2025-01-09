import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';  // Import your AppComponent
import { TableComponent } from './table/table.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  imports: [
    BrowserModule,  // Import BrowserModule
    AppComponent,    // Import AppComponent here as it's standalone
    TableComponent,  // Import TableComponent
    ChartComponent   // Import ChartComponent
  ],
  providers: [],
  bootstrap: []  // Bootstrapping the AppComponent
})
export class AppModule {}
