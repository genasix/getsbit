import { Injectable } from '@angular/core';
import * as Highcharts from "highcharts/highstock";

// @Injectable({
//   providedIn: 'root'
// })
export class ChartManagerService {

  constructor() { }

  generateChart(viewChild,option,callback?){
    return Highcharts.stockChart(viewChild,option,callback)
  }

  addSeres(chartObject, option){
    chartObject.addSeries(option)
  }

}
