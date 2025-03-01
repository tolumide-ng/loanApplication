import { FormStep, StepId } from '@/utils/types';

export const steps: FormStep[] = [
  {
    title: 'Personal Information',
    id: StepId.PersonalInformation,
    content: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
      },
      {
        name: 'dateOfBirth',
        label: 'Date of Birth',
        type: 'date',
      },
    ],
  },
  {
    title: 'Contact Details',
    id: StepId.ContactDetails,
    content: [
      { name: 'email', label: 'Email', type: 'email' },
      {
        name: 'phone',
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
        name: 'loanAmount',
        label: 'Loan Amount',
        type: 'number',
      },
      {
        name: 'upfrontPayment',
        label: 'Upfront Payment',
        type: 'number',
      },
      {
        name: 'terms',
        label: 'Terms',
        type: 'number',
      },
    ],
  },
  {
    title: 'Financial Information',
    id: StepId.FinancialInformation,
    content: [
      { name: 'monthlySalary', label: 'Monthly Salary', type: 'number' },
      { name: 'additionalIncome', label: 'Additional Income', type: 'number' },
      { name: 'mortgage', label: 'Mortgage', type: 'number' },
      { name: 'otherCredits', label: 'Other Credits', type: 'number' },
    ],
  },
  {
    title: 'Confirm Data',
    id: StepId.Confirm,
    content: [
      {
        name: 'confirm',
        label: 'I Confirm',
        type: 'checkbox',
      },
    ],
  },
] as const;
