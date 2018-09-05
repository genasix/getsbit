import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as Highcharts from 'highcharts/highstock';
import * as Highcharts2 from 'highcharts';
import {ChartObject} from 'highcharts/highstock';
import {ApiDataParserService} from "../../../service/api-data-parser.service";
import {DataPoint} from "highcharts";
import {currentChartOptions, predictionChartOptions, highchartTheme} from '../data/bit-data'
import {ChartManagerService} from "../../../service/chart-manager.service";



@Component({
  selector: 'app-chart',
    template: `
    bitChart
    <!--(mousemove)="drawCross($event)"-->
    <div class="row">
      <div #container class="col-xs-7 col-sm-7 placeholder"></div><div #test class="col-xs-5 col-sm-5 placeholder"></div>
    </div>
    <input #box/>
    <button #startGame (click)="updateChart(box.value)">start</button>
      
    
  `
})

export class ChartComponent {

  chartManager : ChartManagerService;
  currentChart : ChartObject;
  expectationChart: ChartObject;
  currentData = {};
  name = 'Angular 5 Highstock';
  @ViewChild("container", {read: ElementRef}) container: ElementRef;
  @ViewChild("test", {read: ElementRef}) test: ElementRef;


  constructor(private http: HttpClient) {
    // Highcharts.setOptions(highchartTheme);
    this.chartManager = new ChartManagerService();
    this.http.get('https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-BTC&count=20').subscribe(json => {

        let data = ApiDataParserService.paseCandleData(json);

        this.expectationChart = this.chartManager.generateChart(this.test.nativeElement, predictionChartOptions, (chartObject) =>{
          chartObject.addSeries({
            name: 'batting',
            data:[[(new Date()).getTime(),0]]
            })
        });

        this.currentChart = this.chartManager.generateChart(this.container.nativeElement, currentChartOptions);

        this.chartManager.addSeres(this.currentChart, {
              type: 'candlestick',
              name: 'AAPL',
              data: data['candleData']
        });

        this.chartManager.addSeres(this.currentChart, {
              type: 'column',
              name: 'Volume',
              data: data['volumeData'],
              yAxis: 1,
        });

        this.chartManager.addSeres(this.currentChart, {
          type: 'line',
          name: 'AAPL',});

        let curData = this.currentData;
        setInterval(()=>{
          curData = this.getIntervalChartData(1);
          let date = new Date();
          if(date.getSeconds() == 0) {
            this.updateChartData(this.currentChart, curData);
          }else{
            this.updateLastData(this.currentChart, curData)
          }
          // setInterval(this.updateChartData(this.currentChart,dd),2000)
        },1000);

    });

  }

  getIntervalChartData(interval){
    this.http.get('https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/'+interval+'?code=CRIX.UPBIT.KRW-BTC&count=1').subscribe(json =>{
      this.currentData = ApiDataParserService.paseCandleData(json);
    });
    return this.currentData;
  }

  updateChart(value){
    let current = new Date();
    let dd = [Number(current.getTime()),Number(value)];
    this.expectationChart.series[0].addPoint([Number(current.getTime()),Number(value)]);
    this.currentChart.series[2].addPoint([Number(current.getTime()),Number(value)]);
  }

  updateLastData(chart:ChartObject, data){
    let len = chart.series[0].options.data.length;
    let lastData = chart.series[0].options.data[len-1];
    if(data['candleData'] != undefined && data['volumeData'] != undefined) {
      chart.series[0].data[len - 1].update([data['candleData'][0][0], data['candleData'][0][1], data['candleData'][0][2], data['candleData'][0][3], data['candleData'][0][4]])
      chart.series[1].data[len - 1].update([data['volumeData'][0][0], data['volumeData'][0][1]])
    }
  }

  updateChartData(chart:ChartObject, data){
    console.log(data);
    if(data['candleData'] != undefined && data['volumeData'] != undefined) {
      chart.series[0].addPoint([data['candleData'][0][0], data['candleData'][0][1], data['candleData'][0][2], data['candleData'][0][3], data['candleData'][0][4]])
      chart.series[1].addPoint([data['volumeData'][0][0], data['volumeData'][0][1]])
    }
  }


}
