import {Component, ElementRef, ViewChild} from '@angular/core';
import {bitChart} from "../data/bit-data";
import {HttpClient} from '@angular/common/http';
import * as Highcharts from 'highcharts/highstock';
import {ChartObject} from 'highcharts/highstock';
import * as moment from 'moment'


@Component({
  selector: 'app-chart',
    template: `
    <!--<div [chart]="chart"></div>-->
    <!--(mousemove)="drawCross($event)"-->
    <div #container ></div>
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
        },
      );

      this.chart.addSeries(
        {
          type: 'column',
          name: 'Volume',
          data: data['volumeData'],
          yAxis: 1,
        },
      )}
    );
  }

  paseUpbitData(data){
    let candleData = [];
    let volumeData = [];
    for(let v of data['candles']){
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

  stringToDate(dateStr:string,format:string){
    return moment(dateStr,format).valueOf();
  }

  // drawCross(e){
  //   this.chart.options.chart.height
  //   var x = e.pageX,
  //     y = e.pageY,
  //     path = ['M', this.chart.options.chart.spacingLeft, y,
  //       'L', this.chart.options.chart.spacingLeft + this.chart.options.chart.width, y,
  //       'M', x, this.chart.options.chart.marginTop,
  //       'L', x, this.chart.options.chart.marginTop + Number(this.chart.options.chart.height)];
  //   this.chart.cr
  //   if (chart.crossLines) {
  //     // update lines
  //     chart.crossLines.attr({
  //       d: path
  //     });
  //   } else {
  //     // draw lines
  //     chart.crossLines = chart.renderer.path(path).attr({
  //       'stroke-width': 2,
  //       stroke: 'green',
  //       zIndex: 10
  //     }).add();
  //   }
  //
  //   if (chart.crossLabel) {
  //     // update label
  //     chart.crossLabel.attr({
  //       y: y + 6,
  //       text: chart.yAxis[0].toValue(y).toFixed(2)
  //     });
  //   } else {
  //     // draw label
  //     chart.crossLabel = chart.renderer.text(chart.yAxis[0].toValue(y).toFixed(2), chart.plotLeft - 40, y + 6).add();
  //   }
  // }

  test(){
    this.http.get('https://crix-api-endpoint.upbit.com/v1/crix/candles/lines?code=CRIX.UPBIT.KRW-BTC').subscribe(json => this.paseUpbitData(json))
  }
}
