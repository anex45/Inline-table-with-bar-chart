import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js'; // Import Chart.js

Chart.register(...registerables);

// Define an interface for the table data item
interface TableDataItem {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';  // Restrict gender to known values
  city: string;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ChartComponent implements OnChanges, AfterViewInit {
  @Input() tableData: TableDataItem[] = [];  // Receiving table data from parent
  @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;

  chart!: Chart;

  ngAfterViewInit() {
    this.createChart();  // Create the chart once the view is initialized
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableData']) {
      this.updateChartData();  // Update chart data when table data changes
    }
  }

  updateChartData() {
    if (this.chart) {
      // Update chart labels
      this.chart.data.labels = this.tableData.map(item => item.name);  // X-axis uses name

      // Update datasets (Age)
      this.chart.data.datasets[0].data = this.tableData.map(item => item.age);  // Y-axis uses age

      // If gender field is present, add gender distribution (or similar data)
      const genderCount = this.getGenderCount();  // This function will return gender counts
      if (this.chart.data.datasets.length > 1) {
        this.chart.data.datasets[1].data = genderCount;
        this.chart.update();
      } else {
        this.chart.data.datasets.push({
          label: 'Gender Distribution',
          data: genderCount,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 159, 64, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)'],
          borderWidth: 1
        });
        this.chart.update();
      }

      // Optional: Add other datasets for fields like city, email, etc.
      const cityCount = this.getCityCount();  // Returns counts for each city
      if (this.chart.data.datasets.length > 2) {
        this.chart.data.datasets[2].data = cityCount;
        this.chart.update();
      } else {
        this.chart.data.datasets.push({
          label: 'City Distribution',
          data: cityCount,
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
          borderWidth: 1
        });
        this.chart.update();
      }
    }
  }

  // Function to count genders
  getGenderCount() {
    const genderMap: { [key in 'Male' | 'Female' | 'Other']: number } = { Male: 0, Female: 0, Other: 0 };

    // Loop through the data to count occurrences of each gender
    this.tableData.forEach(item => {
      if (genderMap[item.gender] !== undefined) {
        genderMap[item.gender]++;
      }
    });

    return Object.values(genderMap);  // Return an array of gender counts
  }

  // Function to count cities (example for city distribution)
  getCityCount() {
    const cityMap: { [key: string]: number } = {};

    // Loop through the data to count occurrences of each city
    this.tableData.forEach(item => {
      cityMap[item.city] = (cityMap[item.city] || 0) + 1;
    });

    return Object.values(cityMap);  // Return array of city counts
  }

  createChart() {
    this.chart = new Chart(this.barChart.nativeElement, {
      type: 'bar',  // Type of chart (bar chart)
      data: {
        labels: this.tableData.map(item => item.name),  // Names as labels
        datasets: [
          {
            label: 'Age',
            data: this.tableData.map(item => item.age),  // Age as the data
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
