import { FormKey } from './types';

export const defaultFormData = {
  [FormKey.FirstName]: '',
  [FormKey.LastName]: '',
  [FormKey.DateOfBirth]: new Date(),
  [FormKey.Email]: '',
  [FormKey.Phone]: '',
  [FormKey.LoanAmount]: 0,
  [FormKey.UpfrontPayment]: 0,
  [FormKey.Terms]: 0,
  [FormKey.MonthlySalary]: 0,
  [FormKey.AdditionalIncome]: 0,
  [FormKey.Mortgage]: 0,
  [FormKey.OtherCredits]: 0,
  [FormKey.ShowAdditionalInformation]: false,
  [FormKey.ShowMortgage]: false,
  [FormKey.ShowOtherCredits]: false,
  [FormKey.Confirm]: false,
};
