import {Injectable} from '@angular/core';
import * as moment from 'moment/moment';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  constructor() {
  }

  static getUtcISOStringDate(date: any): string {
    return moment(date).utc().toISOString();
  }

  /**
   * It will return true only if; both dates are having equal Year, Month and Day.
   * @param date1
   * @param date2
   */
  static isOnlyDateSame(date1: any, date2: any): boolean {
    let _date1 = moment(date1);
    let _date2 = moment(date2);
    return (_date1.isSame(_date2, 'year') && _date1.isSame(_date2, 'month') && _date1.isSame(_date2, 'day'))
  }

  /**
   * It will return true only if; both dates are having same week day.
   * @param date1
   * @param date2
   */
  static isWeekDaySame(date1: any, date2: any): boolean {
    let _date1 = moment(date1);
    let _date2 = moment(date2);
    return (_date1.format('d') == _date2.format('d'));
    // return (_date1.isSame(_date2, 'year') && _date1.isSame(_date2, 'month') && _date1.isSame(_date2, 'day'))
  }
}
