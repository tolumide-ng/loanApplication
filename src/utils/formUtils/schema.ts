import { z } from 'zod';
import { CONSTANTS } from '@/utils/constants';
import { FormKey } from '../types';

function numericString(label: string) {
  return z
    .union([z.string(), z.number()])
    .transform((val) => parseFloat(String(val)))
    .refine((val) => !isNaN(val), `Please provide a valid ${label}`);
}

export type ValidationSchema = z.infer<typeof validationSchema>;
export type ValidationReturn = (schema: typeof validationSchema) => void;

export const validationSchema = z.object({
  [FormKey.FirstName]: z
    .string()
    .min(1, 'First name is required')
    .regex(CONSTANTS.nameRegex, 'Only Latin and German letters are allowed')
    .refine((name) => !name.includes(' '), 'Only a single name is allowed'),

  [FormKey.LastName]: z
    .string()
    .min(1, 'Last name is required')
    .regex(
      CONSTANTS.multiNameRegex,
      'Only Latin and German letters are allowed',
    ),

  [FormKey.DateOfBirth]: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), 'Invalid date format')
    .transform((date) => new Date(date))
    .refine(
      (date) => new Date(date) >= CONSTANTS.minDate,
      'Please provide a valid age: Max age is 79 years old',
    )
    .refine((date) => {
      const age = new Date().getFullYear() - new Date(date).getFullYear();
      return age >= CONSTANTS.minAge;
    }, 'User must be at least 18 years old'),

  [FormKey.Email]: z.string().email('Invalid email format'),

  [FormKey.Phone]: z
    .string()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      'Invalid phone format: phone must match +49... format',
    ),

  [FormKey.LoanAmount]: numericString('Load Amount').pipe(
    z
      .number()
      .min(CONSTANTS.minLoanAmount, 'Loan amount is too low')
      .max(CONSTANTS.maxLoanAmount, 'Loan amount is too high'),
  ),

  [FormKey.UpfrontPayment]: numericString('Upfront Payment'),

  [FormKey.Terms]: numericString('Term').pipe(
    z
      .number()
      .min(CONSTANTS.minTerm, 'term is too low')
      .max(CONSTANTS.maxTerm, 'term is too high'),
  ),

  [FormKey.MonthlySalary]: numericString('Monthly salary')
    .pipe(z.number().min(1, 'Salary must be greater than 0'))
    .default('0'),

  [FormKey.AdditionalIncome]: numericString('Additional Income')
    .optional()
    .default(0),

  [FormKey.Mortgage]: numericString('Mortgage').optional().default('0'),

  [FormKey.OtherCredits]: numericString('credit').optional().default('0'),

  [FormKey.ShowAdditionalInformation]: z.boolean(),
  [FormKey.ShowMortgage]: z.boolean(),
  [FormKey.ShowOtherCredits]: z.boolean(),

  [FormKey.Confirm]: z
    .boolean()
    .refine((value) => value === true, 'You must confirm to proceed'),
});

export const refinements: Partial<Record<FormKey, ValidationReturn>> = {
  [FormKey.UpfrontPayment]: (schema: typeof validationSchema) =>
    schema.refine((data) => data.upfrontPayment < data.loanAmount, {
      message: 'Upfront payment must be lower than loan amount',
      path: ['upfrontPayment'],
    }),
  [FormKey.Terms]: (schema: typeof validationSchema) =>
    schema.refine(
      (data) => {
        const dob = new Date(data.dateOfBirth ?? new Date());
        const age = new Date().getFullYear() - dob.getFullYear();
        return age + data.terms / CONSTANTS.maxPeriod <= CONSTANTS.maxAge;
      },
      { message: 'Loan term + age must be under 80 years', path: ['terms'] },
    ),
};
