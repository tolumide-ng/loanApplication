import { FormKey } from '../types';

export const optionalFields: Partial<Record<FormKey, FormKey>> = {
  [FormKey.AdditionalIncome]: FormKey.ShowAdditionalInformation,
  [FormKey.Mortgage]: FormKey.ShowMortgage,
  [FormKey.OtherCredits]: FormKey.ShowOtherCredits,
};

export const excludeKeys = ['confirm'];
