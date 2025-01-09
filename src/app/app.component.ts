import { Component } from '@angular/core';
import { TableComponent } from './table/table.component';
import { ChartComponent } from './chart/chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [TableComponent, ChartComponent]  // Import both components
})
export class AppComponent {
  tableData: any[] = [
    { name: 'John', age: 28 },
    { name: 'Jane', age: 32 }
  ];

  onTableDataChange(updatedData: any[]) {
    this.tableData = updatedData;
  }
}
