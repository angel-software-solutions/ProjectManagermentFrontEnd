enum InvoiceFrequency {
  All,
  Current,
  Invoices,
  Monthly,
  Weekly,
  Biweekly,
  Quarterly,
  Custom,
  Yearly,
  YearToDate
}

const InvoiceFrequencies = new Map<number, string>([
  [InvoiceFrequency.All, "All"],
  [InvoiceFrequency.Current, "Current"],
  [InvoiceFrequency.Invoices, "Invoices"],
  [InvoiceFrequency.Monthly, "Monthly"],
  [InvoiceFrequency.Weekly, "Weekly"],
  [InvoiceFrequency.Biweekly, "Biweekly"],
  [InvoiceFrequency.Quarterly, "Quarterly"],
  [InvoiceFrequency.Custom, "Custom"],
  [InvoiceFrequency.Yearly, "Yearly"],
  [InvoiceFrequency.YearToDate, "Year To Date"]
]);

export { InvoiceFrequency, InvoiceFrequencies };
