import {Component, ElementRef, ViewChild} from '@angular/core';
import {bitChart} from "../data/bit-data";
import {HttpClient} from '@angular/common/http';
import * as Highcharts from 'highcharts/highstock';
import {ChartObject} from 'highcharts/highstock';
import * as moment from 'moment'


@Component({
  selector: 'app-chart',
    template: `
    bitChart
    <!--(mousemove)="drawCross($event)"-->
    <div #container ></div>
  `
})

export class ChartComponent {

  bitChart : ChartObject;
  currentData = {};
  name = 'Angular 5 Highstock';
  @ViewChild("container", {read: ElementRef}) container: ElementRef;

  constructor(private http: HttpClient) {

    this.http.get('https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-BTC&count=20').subscribe(json =>
      {
        console.log(json);
        let data = this.paseUpbitData(json);
        let dd = this.currentData;
        setInterval(()=>{
          dd = this.getIntervalChartData();
          },5000);

        this.bitChart = Highcharts.stockChart(this.container.nativeElement, {
          chart: {
            spacingLeft:40,
            marginRight: 40,
            type: 'candlestick',
            events : {
              load : function (e) {
                console.log(this.series);
                setInterval(()=>{

                  if(dd['candleData'] != undefined && dd['volumeData'] != undefined) {
                    console.log(dd['candleData'][0]);
                    console.log(dd['volumeData'][0]);

                    this.series[0].addPoint([dd['candleData'][0][0],dd['candleData'][0][1], dd['candleData'][0][2], dd['candleData'][0][3],dd['candleData'][0][4]]);
                    this.series[1].addPoint([dd['volumeData'][0][0], dd['volumeData'][0][1]]);
                  }
                  // console.log(data)
                },60000);

              }
            }
          },
          // rangeSelector: {
          //   buttons: [{
          //     count: 2,
          //     type: 'hour',
          //     text: '2h'
          //   }, {
          //     count: 10,
          //     type: 'hour',
          //     text: '10h'
          //   }, {
          //     type: 'all',
          //     text: 'All'
          //   }],
          //   inputEnabled: false,
          // },

          title: {
            text: 'AAPL Historical'
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

          time: {useUTC: false}
        });

        // this.updateChartOption(dd);

      this.bitChart.addSeries(
        {
          type: 'candlestick',
          name: 'AAPL',
          data: (function () {
            console.log(dd['candleData']);
            // if(dd['candleData'] != undefined){
            //   for(let d of dd['candleData']){
            //     data['candleData'].push(d)
            //     console.log(data['candleData'])
            //   }
            // }
            return data['candleData'];
          })(),
        },
      );
      this.bitChart.addSeries(
        {
          type: 'column',
          name: 'Volume',
          data: (function () {
            // if(dd['volumeData'] != undefined) {
            //   for (let d of dd['volumeData']) {
            //     data['volumeData'].push(d)
            //   }
            // }
            return data['volumeData'];
          })(),
          yAxis: 1,
        },
      );
      console.log(this.bitChart.series);

      // setInterval(()=>this.getIntervalChartData(),5000)
    }
    );

  }

  paseUpbitData(data){
    let candleData = [];
    let volumeData = [];
    for(let v of data){
      let date = this.stringToDate(v['candleDateTimeKst'], 'YYYY-MM-DDTHH:mm:ssZ');
      candleData.push([date,v['openingPrice'],v['highPrice'],v['lowPrice'],v['tradePrice']]);
      volumeData.push([date, v['candleAccTradeVolume']])
    }
    let sortFn = ((a, b) => {
      if(a[0]<b[0]){ return -1;}
      else {return 1;}
    });
    candleData.sort(sortFn);
    volumeData.sort(sortFn);

    return {
      "candleData": candleData,
      "volumeData": volumeData
    };
  }

  getIntervalChartData(){
    this.http.get('https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-BTC&count=1').subscribe(json =>{
      this.currentData = this.paseUpbitData(json);
      // console.log(this.currentData)
      // this.updateChartOption(data)
      // console.log(data)
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
        events : {
          click : function (e) {
            console.log(e)
            alert("test");
            console.log(data)
            // setInterval(()=>{
            //   this.series[0].addPoint([data['candleData'][0],data['candleData'][1],data['candleData'][2],data['candleData'][3]],true,true);
            //   this.series[1].addPoint([data['volumeData'][0],data['volumeData'][1]],true,true);
            //   console.log(data)
            // },5000);

          }
        }
      }
    },true,true)
  }

  stringToDate(dateStr:string,format:string){
    return moment(dateStr,format).valueOf();
  }

  // drawCross(e){
  //   this.chart.options.chart.heightbitChart   var x bitChartageX,
  //     y = e.pageY,
  //     path = ['M', this.chart.options.chart.spacinbitChart, y,
  //bitChart  'L', this.chart.options.chart.spacinbitChart + this.cbitChartoptions.chart.width,bitChart //      bitChart x, this.chart.options.chart.marginbitChart  //     bitChart, x, this.chart.options.chart.marginbitChart Number(tbitCharthart.options.chart.heightbitChart //   thibitChartrt.cr
  //   if (chart.bitChartLines) {
  //  bitChart update lines
  //     chart.crossLines.attr({
  // bitChart    d: path
  //     });
  //   } else {
  //     // draw lines
  //     chart.crossLines = chart.rbitCharter.path(path).bitChart{
  //       'stroke-width': 2,
  //       stroke: 'green',
  //       zIndex: 10
  //     }).add();
  //   }
  //
  //   if (chart.crossLabel) {
  //  bitChart update label
  //     chart.crossLabel.attr({
  // bitChart    y: y + 6,
  //       text: chart.yAxis[0].toValue(y).bitCharted(2)
  //     });
  //   } else {
  //     // draw label
  //     chart.crossLabel = chart.rbitCharter.text(chart.bitChart[0].toValue(y).bitCharted(2), chart.plotLeft - 40, y + 6bitChart();
  //   }
  // }

  test(){
    this.http.get('https://crix-api-endpoint.upbit.com/v1/crix/candles/lines?code=CRIX.UPBIT.KRW-BTC').subscribe(json => this.paseUpbitData(json))
  }
}
