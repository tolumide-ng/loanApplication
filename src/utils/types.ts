export enum FormKey {
  FirstName = 'firstName',
  LastName = 'lastName',
  DateOfBirth = 'dateOfBirth',
  Email = 'email',
  Phone = 'phone',
  LoanAmount = 'loanAmount',
  UpfrontPayment = 'upfrontPayment',
  Terms = 'terms',
  MonthlySalary = 'monthlySalary',
  AdditionalIncome = 'additionalIncome',
  Mortgage = 'mortgage',
  OtherCredits = 'otherCredits',
  ShowAdditionalInformation = 'showAdditionalInformation',
  ShowMortgage = 'showMortgage',
  ShowOtherCredits = 'showOtherCredits',
  Confirm = 'confirm',
}

export type UserData = {
  [FormKey.FirstName]: string;
  [FormKey.LastName]: string;
  [FormKey.DateOfBirth]: Date;
  [FormKey.Email]: string;
  [FormKey.Phone]: string;
  [FormKey.LoanAmount]: number;
  [FormKey.UpfrontPayment]: number;
  [FormKey.Terms]: number;
  [FormKey.MonthlySalary]: number;
  [FormKey.AdditionalIncome]: number;
  [FormKey.Mortgage]: number;
  [FormKey.OtherCredits]: number;
  [FormKey.ShowAdditionalInformation]: boolean;
  [FormKey.ShowMortgage]: boolean;
  [FormKey.ShowOtherCredits]: boolean;
  [FormKey.Confirm]: boolean;
};

export enum StepId {
  PersonalInformation = 'personalInformation',
  ContactDetails = 'contactDetails',
  LoanRequest = 'loanRequest',
  FinancialInformation = 'financialInformation',
  Confirm = 'confirm',
}

export enum Status {
  Rest = 'rest',
  Loading = 'loading',
  Error = 'error',
  Success = 'success',
}

export type FormInput<T, K extends keyof T = keyof T> = {
  name: K;
  label: string;
  type: 'text' | 'date' | 'number' | 'email' | 'checkbox';
};

export type FormStep<T = UserData> = {
  title: string;
  content: Array<FormInput<T>>;
  id: StepId;
};

export type FormState = {
  formId: null | string;
  status: Status;
  activeStepId: StepId;
  index: number;
};

export type FormStepByCategory = Record<
  StepId,
  { keys: FormKey[]; index: number; next: StepId | null }
>;
