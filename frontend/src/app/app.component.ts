import { Component } from '@angular/core';
import {getChartData1, getChartData2} from "./chart-component/data/char-data";
import {bitChart, bitData} from "./chart-component/data/bit-data";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chartData: any;
  constructor(){
    // this.chartData = bitChart;
  }

  updateChart(type){
    // this.chartData = type === 'bar' ? bitChart : getChartData2;
  }

}
