// 
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
  styleUrls: ['./analytics.scss']
})
export class Analytics {

  charts: ChartOptions[] = [
    this.createChart('Patients', '#0032A0',
      [320, 800, 480, 250, 690, 570, 490]),

    this.createChart('Number of Front Desk', '#727CF5',
      [120, 200, 80, 260, 10, 290, 30]),

    this.createChart('Number of Providers', '#0ACF97',
      [80, 120, 160, 140, 190, 210, 230]),

    this.createChart('Wait time per provider/avg across time', '#67BAF1',
      [200, 240, 260, 300, 40, 360, 90]),

    this.createChart('Patients per zip code across time', '#44DFDF',
      [90, 30, 150, 170, 210, 240, 260]),

    this.createChart('Missed appointments by provider', '#85657A',
      [160, 80, 70, 90, 120, 140, 60]),

    this.createChart('Missed appointments by patients', '#FDB0BF',
      [300, 20, 350, 30, 420, 460, 500])
  ];

  private createChart(name: string, color: string, data: number[]): ChartOptions {
    return {
      series: [
        {
          name,
          data
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false }
      },
      colors: [color],
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '50%'
        }
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: [
          ['01', 'Jan'], ['02', 'Jan'], ['03', 'Jan'],
          ['04', 'Jan'], ['05', 'Jan'], ['06', 'Jan'], ['07', 'Jan']
        ]
      },
      yaxis: {
        title: {
          text: name
        }
      }
    };
  }
}
