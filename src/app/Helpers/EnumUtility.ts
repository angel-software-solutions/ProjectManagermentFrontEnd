import {
  InvoiceFrequency,
  InvoiceFrequencies
} from "../Enums/InvoiceFrequency";
import { LicenseTypes, LicenseType } from "../Enums/LicenseTypes";
import { from } from "rxjs";

export class EnumUtility {
  static GetList = enumtype => {
    let list = new Array<any>();
    if (typeof enumtype == typeof InvoiceFrequency) {
      InvoiceFrequencies.forEach(function(value, key) {
        list.push({ Lable: value, Value: key });
      });
      return list;
    }
  };

  static GetLicenseTypeList(enumtype) {
    let list = new Array<any>();

    let returnList = new Array<any>();
    Object.assign(list, enumtype);
    list.forEach((element, index) => {
      returnList.push({ Lable: element, Value: index });
    });
    return returnList;
  }
}
