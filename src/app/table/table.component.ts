import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true, // Mark TableComponent as standalone
  imports: [CommonModule, FormsModule] // Import FormsModule for ngModel
})
export class TableComponent {
  @Output() tableDataChange = new EventEmitter<any[]>(); // EventEmitter to send changes to parent component

  // Example table data with more fields (name, age, gender, email, and city)
  tableData: any[] = [
    { name: 'John', age: 28, gender: 'Male', email: 'john@example.com', city: 'New York' },
    { name: 'Jane', age: 32, gender: 'Female', email: 'jane@example.com', city: 'Los Angeles' }
  ];

  // Add a new row with all fields
  addRow() {
    this.tableData.push({ name: '', age: 0, gender: '', email: '', city: '' });
    this.changeData(); // Emit the changes to the parent component
  }

  // Remove a row based on the index
  removeRow(index: number) {
    this.tableData.splice(index, 1);
    this.changeData(); // Emit the changes to the parent component
  }

  // Update a specific row field
  updateRow(index: number, field: string, value: any) {
    this.tableData[index][field] = value;
    this.changeData(); // Emit the changes to the parent component
  }

  // Emit updated table data
  private emitTableData() {
    this.tableDataChange.emit([...this.tableData]);
  }

  // Call emitTableData to notify parent component of changes
  changeData() {
    this.emitTableData();
  }
}
