import {
  InvoiceFrequency,
  InvoiceFrequencies
} from "../Enums/InvoiceFrequency";

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
}
