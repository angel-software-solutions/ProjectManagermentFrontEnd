enum LicenseType {
  Professional,
  Executive
}

const LicenseTypes = new Map<number, string>([
  [LicenseType.Professional, "Professional"],
  [LicenseType.Executive, "Executive"]
]);

export { LicenseType, LicenseTypes };
