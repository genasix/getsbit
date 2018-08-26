import {Component, Input, OnChanges, OnInit, SimpleChanges,ElementRef, ViewChild} from '@angular/core';
import {bitChart, bitData} from "../data/bit-data";
import {Chart} from "angular-highcharts";
import { HttpClient, HttpHandler } from '@angular/common/http';
import * as Highcharts from 'highcharts/highstock';
import {ChartObject} from "highcharts/highstock";

//
// const groupingUnits = [[
//   'minute',                         // unit name
//   [1]                             // allowed multiples
// ], [
//   'month',
//   [1, 2, 3, 4, 6]
// ]];


@Component({
  selector: 'app-chart',
    template: `
    <!--<div [chart]="chart"></div>-->
    <div #container></div>
  `
})

export class ChartComponent {

  chart : ChartObject;
  name = 'Angular 5 Highstock';
  @ViewChild("container", {read: ElementRef}) container: ElementRef;

  constructor(private http: HttpClient) {

    this.http.get('https://crix-api-endpoint.upbit.com/v1/crix/candles/lines?code=CRIX.UPBIT.KRW-BTC').subscribe(json => {
      this.chart = Highcharts.stockChart(this.container.nativeElement, bitChart);
      let data = this.paseUpbitData(json);

      this.chart.addSeries(
        {
          type: 'candlestick',
          name: 'AAPL',
          data: data['candleData'],
          // dataGrouping: {
          //   units: groupingUnits
          // },
        },
      );

      this.chart.addSeries(
        {
          type: 'column',
          name: 'Volume',
          data: data['volumeData'],
          yAxis: 1,
          // dataGrouping: {
          //   units: groupingUnits
          // }
        },
      )}
    );
  }


  paseData(data) {
    let parsedData = [];

    for (let v of data) {
      let date = (v['x'] + 32400) * 1000;
      parsedData.push([date, v['y']])
    }
    return parsedData;
  }

  paseUpbitData(data){
    let candleData = [];
    let volumeData = [];
    for(let v of data['candles']){
      candleData.push([v['timestamp'],v['openingPrice'],v['highPrice'],v['lowPrice'],v['tradePrice']]);
      volumeData.push([v['timestamp'], v['candleAccTradeVolume']])
    }
    let parsedData = {
      "candleData" : candleData,
      "volumeData" : volumeData
    };
    console.log(data);

    return parsedData;
  }


  test(){
    this.http.get('https://crix-api-endpoint.upbit.com/v1/crix/candles/lines?code=CRIX.UPBIT.KRW-BTC').subscribe(json => this.paseUpbitData(json))
  }
}
