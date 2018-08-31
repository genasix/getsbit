import { Injectable } from '@angular/core';
import * as moment from "moment";
import { Util } from '../util/util';


export class ApiDataParserService {

  constructor() {

  }


  static paseCandleData(json){
    let candleData = [];
    let volumeData = [];
    for(let v of json){
      let date = Util.stringToDate(v['candleDateTimeKst'], 'YYYY-MM-DDTHH:mm:ssZ');
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

}
