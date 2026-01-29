import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;  
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  colors: string[];
};

@Component({
  selector: 'app-analytics',
  standalone: true,                 
  imports: [NgApexchartsModule],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.scss'],    
})
export class Analytics {

chartOptions: ChartOptions = {
  series: [
    {
      name: 'Patients',
      data: [320, 410, 480, 250, 690, 570, 490, 320, 800, 140, 400, 230]
    }
  ],
  chart: {
    type: 'bar',
    height: 350,
    fontFamily: 'Montserrat, sans-serif',
    toolbar: {
      show: false
    }
  },
  colors: ['#0032A0'],
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: '50%'
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: [
      ['01', 'Jan'], ['02', 'Jan'], ['03', 'Jan'], ['04', 'Jan'],
      ['05', 'Jan'], ['06', 'Jan'], ['07', 'Jan'], ['08', 'Jan'],
      ['09', 'Jan'], ['10', 'Jan'], ['11', 'Jan'], ['12', 'Jan']
    ],
    labels: {
      style: {
        fontWeight: 500,
        fontSize: '12px'
      }
    }
  },
  yaxis: {
    title: {
      text: 'Number of Patients',
      rotate: -90,
      style: {
        fontWeight: 600,
        fontSize: '14px'
      }
    }
  }
};

}
