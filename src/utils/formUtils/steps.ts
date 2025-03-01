import { FormKey, FormStep, FormStepByCategory, StepId } from '@/utils/types';

export const steps: FormStep[] = [
  {
    title: 'Personal Information',
    id: StepId.PersonalInformation,
    content: [
      {
        name: FormKey.FirstName,
        label: 'First Name',
        type: 'text',
      },
      {
        name: FormKey.LastName,
        label: 'Last Name',
        type: 'text',
      },
      {
        name: FormKey.DateOfBirth,
        label: 'Date of Birth',
        type: 'date',
      },
    ],
  },
  {
    title: 'Contact Details',
    id: StepId.ContactDetails,
    content: [
      { name: FormKey.Email, label: 'Email', type: 'email' },
      {
        name: FormKey.Phone,
        label: 'Phone Number',
        type: 'text',
      },
    ],
  },
  {
    title: 'Loan Request',
    id: StepId.LoanRequest,
    content: [
      {
        name: FormKey.LoanAmount,
        label: 'Loan Amount',
        type: 'number',
      },
      {
        name: FormKey.UpfrontPayment,
        label: 'Upfront Payment',
        type: 'number',
      },
      {
        name: FormKey.Terms,
        label: 'Terms',
        type: 'number',
      },
    ],
  },
  {
    title: 'Financial Information',
    id: StepId.FinancialInformation,
    content: [
      { name: FormKey.MonthlySalary, label: 'Monthly Salary', type: 'number' },
      {
        name: FormKey.AdditionalIncome,
        label: 'Additional Income',
        type: 'number',
      },
      { name: FormKey.Mortgage, label: 'Mortgage', type: 'number' },
      { name: FormKey.OtherCredits, label: 'Other Credits', type: 'number' },
    ],
  },
  {
    title: 'Confirm Data',
    id: StepId.Confirm,
    content: [
      {
        name: FormKey.Confirm,
        label: 'I Confirm',
        type: 'checkbox',
      },
    ],
  },
] as const;

export const formStepsByCategory: FormStepByCategory = {
  [StepId.PersonalInformation]: {
    keys: [FormKey.FirstName, FormKey.LastName, FormKey.DateOfBirth],
    index: 0,
    next: StepId.ContactDetails,
  },
  [StepId.ContactDetails]: {
    keys: [FormKey.Email, FormKey.Phone],
    index: 1,
    next: StepId.LoanRequest,
  },
  [StepId.LoanRequest]: {
    keys: [FormKey.LoanAmount, FormKey.UpfrontPayment, FormKey.Terms],
    index: 2,
    next: StepId.FinancialInformation,
  },
  [StepId.FinancialInformation]: {
    keys: [
      FormKey.MonthlySalary,
      FormKey.AdditionalIncome,
      FormKey.Mortgage,
      FormKey.OtherCredits,
    ],
    index: 3,
    next: StepId.Confirm,
  },
  [StepId.Confirm]: {
    keys: [FormKey.Confirm],
    index: 4,
    next: null,
  },
};
