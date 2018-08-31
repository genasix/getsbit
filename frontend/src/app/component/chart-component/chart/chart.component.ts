import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as Highcharts from 'highcharts/highstock';
import {ChartObject} from 'highcharts/highstock';
import {ApiDataParserService} from "../../../service/api-data-parser.service";
import {DataPoint} from "highcharts";

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

  bitChart : ChartObject;
  testChart: ChartObject;
  currentData = {};
  name = 'Angular 5 Highstock';
  @ViewChild("container", {read: ElementRef}) container: ElementRef;
  @ViewChild("test", {read: ElementRef}) test: ElementRef;

  updateChart(value){
    let current = new Date();
    let dd = [Number(current.getTime()),Number(value)];
    this.testChart.series[0].addPoint([Number(current.getTime()),Number(value)]);
    this.bitChart.series[2].addPoint([Number(current.getTime()),Number(value)]);

    console.log(this.testChart.series);
    console.log(Number(current.getTime()))

    // this.bitChart.addSeries(
    //   {
    //     type: 'line',
    //     name: 'AAPL',
    //     data: (function () {
    //       console.log(data['candleData']);
    //       return data['candleData'];
    //     })(),
    //   },
    // );
  }
  constructor(private http: HttpClient) {

    this.http.get('https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-BTC&count=20').subscribe(json =>
      {
        console.log(json);
        let data = ApiDataParserService.paseCandleData(json);
        let dd = this.currentData;
        let testCurruent = new Date();
        setInterval(()=>{
          dd = this.getIntervalChartData();
          },5000);
        this.testChart = Highcharts.stockChart(this.test.nativeElement, {
          title: {
            text: 'Prediction BTC'
          },
          xAxis: {
            // crosshair: true,
            ordinal: false,

            labels: {
              format: '{value:%Y-%m-%d<br/>%H:%M:%S}',
              align: 'center'
            },
            title: {
              text: '시간'
            },

          },
          yAxis: [{
            labels: {
              align: 'right',
              x: -3
            },
            title: {
              text: 'OHLC'
            },
            height: '60%',
            lineWidth: 2,
            resize: {
              enabled: true
            },
            crosshair: true
          }],
          plotOptions: {
            spline: {
              marker: {
                enabled: true
              }
            }
          },
          tooltip: {
            split: true
          },
          time: {useUTC: false},
        },(c)=>{
          c.addSeries({
            name: 'batting',
            data:[[(new Date()).getTime(),0]]
          });
        });

        this.bitChart = Highcharts.stockChart(this.container.nativeElement, {

          //   spacingLeft:40,
          //   marginRight: 40,
          //   type: 'candlestick',
          //   events : {
          //     load : function (e) {
          //       console.log(this.series);
          //       setInterval(()=>{
          //
          //         if(dd['candleData'] != undefined && dd['volumeData'] != undefined) {
          //           console.log(dd['candleData'][0]);
          //           console.log(dd['volumeData'][0]);
          //
          //           this.series[0].addPoint([dd['candleData'][0][0],dd['candleData'][0][1], dd['candleData'][0][2], dd['candleData'][0][3],dd['candleData'][0][4]]);
          //           this.series[1].addPoint([dd['volumeData'][0][0], dd['volumeData'][0][1]]);
          //         }
          //         // console.log(data)
          //       },60000);
          //
          //     }
          //   }
          // },
          title: {
            text: 'Current BTC'
          },
          xAxis: {
            // crosshair: true,
            ordinal: false,

            labels: {
              format: '{value:%Y-%m-%d<br/>%H:%M:%S}',
              align: 'center'
            },
            title: {
              text: '시간'
            },

          },
          yAxis: [{
            labels: {
              align: 'right',
              x: -3
            },
            title: {
              text: 'OHLC'
            },
            height: '60%',
            lineWidth: 2,
            resize: {
              enabled: true
            },
            crosshair: true
          }, {
            labels: {
              align: 'right',
              x: -3
            },
            title: {
              text: 'Volume'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
          }],

          tooltip: {
            split: true
          },

          time: {useUTC: false},
          series: [{
            type: 'candlestick',
            name: 'AAPL',
            data: (function () {
              return data['candleData'];
            })(),
          },{
            type: 'column',
            name: 'Volume',
            data: (function () {
              return data['volumeData'];
            })(),
            yAxis: 1,
          }]
        },(d)=>{

          console.log(d.series);
          setInterval(()=>{
            if(dd['candleData'] != undefined && dd['volumeData'] != undefined) {
              console.log("update!!");
              console.log(this.bitChart.series)
              d.series[0].addPoint([dd['candleData'][0][0],dd['candleData'][0][1], dd['candleData'][0][2], dd['candleData'][0][3],dd['candleData'][0][4]]);
              d.series[1].addPoint([dd['volumeData'][0][0], dd['volumeData'][0][1]]);

            }
            // console.log(data)
          },60000);
        });
      this.bitChart.addSeries(
        {
          type: 'line',
          name: 'AAPL',
          // data: (function () {
          //   console.log(data['candleData']);
          //   return data['candleData'];
          // })(),
        },
      );

      // this.bitChart.addSeries(
      //   {
      //     type: 'column',
      //     name: 'Volume',
      //     data: (function () {
      //       return data['volumeData'];
      //     })(),
      //     yAxis: 1,
      //   },
      // );
      // this.updateChartOption(dd)
      // setInterval(()=>this.getIntervalChartData(),5000)
      // this.updateChartOption(this.currentData)
    }
    );

  }

  generateChart(option,callback){

  }

  addSeres(chartObject, option){

  }

  getIntervalChartData(){
    this.http.get('https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-BTC&count=1').subscribe(json =>{
      this.currentData = ApiDataParserService.paseCandleData(json);
    });
    return this.currentData;
  }

  addChartData(dataList,data){
    for(let d of data){
      dataList.push(d)
      console.log(d)
    }

  }

  updateChartOption(data){

    this.bitChart.update({
      chart: {
        spacingLeft:40,
        marginRight: 40,
        type: 'candlestick',
        events : {
          load : function (e) {
            console.log(this.series);
            setInterval(()=>{
              if(data['candleData'] != undefined && data['volumeData'] != undefined) {
                console.log("update!!");
                console.log(data['volumeData'][0]);

                this.series[0].addPoint([data['candleData'][0][0],data['candleData'][0][1], data['candleData'][0][2], data['candleData'][0][3],data['candleData'][0][4]]);
                this.series[1].addPoint([data['volumeData'][0][0], data['volumeData'][0][1]]);
              }
              // console.log(data)
            },60000);

          }
        }
      },
    })
  }

}
