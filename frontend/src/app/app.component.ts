import { Component } from '@angular/core';
import {getChartData1, getChartData2} from "./component/chart-component/data/char-data";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chartData: any;
  constructor(){
    // this.chartData = currentChart;
  }

  updateChart(type){
    // this.chartData = type === 'bar' ? currentChart : getChartData2;
  }

}
