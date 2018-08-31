import * as moment from "moment";

export class Util {
  static stringToDate(dateStr:string,format:string){
    return moment(dateStr,format).valueOf();
  }

}
