export type UserData = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
  loanAmount: number;
  upfrontPayment: number;
  terms: number;
  monthlySalary: number;
  additionalIncome: number;
  mortgage: number;
  otherCredits: number;
  showAdditionalInformation: boolean;
  showMortgage: boolean;
  showOtherCredits: boolean;
  confirm: boolean;
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
