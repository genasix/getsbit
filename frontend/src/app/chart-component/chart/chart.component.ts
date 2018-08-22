import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {bitChart, bitData} from "../data/bit-data";
import {Chart} from "angular-highcharts";
declare var $: any;

@Component({
  selector: 'app-chart',
    template: `
    <div [chart]="chart"></div>
  `
})

export class ChartComponent implements OnInit {
  chartData = new Array;
  chart = new Chart(bitChart);


  constructor() {
    this.addChartData();
    this.chart.addSerie({
      // type: 'candlestick',
      data: this.chartData,
      marker: {
        enabled: true,
        radius: 3,
        symbol: 'circle'
      },
      name: 'bit'
    });
    // this.requestTest()
  }



  addChartData() {
    for(let v of bitData["values"]){
      this.chartData.push([v['x'], v['y']])
    }
  }

  // requestTest() {
  //   var result = undefined;
  //   $.ajax({
  //     type: "GET",
  //     url: "https://api.blockchain.info/charts/transactions-per-second?timespan=5weeks&rollingAverage=8hours&format=json",
  //     cache: false,
  //     async:false,
  //     success: function (data) {
  //       result = data;
  //       console.log(data)
  //     },
  //     error: function (request,status,error) {
  //       // putMessage("REST API[" + url + "] 호출 후 에러 발생.");
  //       alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
  //     }
  //   });
  //   return result;
  // }

  ngOnInit(){

  }
}
