const maxAge = 79;

export const CONSTANTS = {
  nameRegex: /^[A-Za-zÄÖÜäöüß]+$/,
  multiNameRegex: /^[A-Za-zÄÖÜäöüß ]+$/,
  maxAge,
  minAge: 18,
  minDate: new Date(new Date().setFullYear(new Date().getFullYear() - maxAge)),
  minLoanAmount: 10_000,
  maxLoanAmount: 70_000,
  minTerm: 10,
  maxTerm: 30,
  maxPeriod: 12,
  formKey: 'userData',
};
