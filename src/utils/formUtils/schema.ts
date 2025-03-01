import { z } from 'zod';
import { CONSTANTS } from '@/utils/constants';

function numericString(label: string) {
  return z
    .union([z.string(), z.number()])
    .transform((val) => parseFloat(String(val)))
    .refine((val) => !isNaN(val), `Please provide a valid ${label}`);
}

export type ValidationSchema = z.infer<typeof validationSchema>;
export type ValidationReturn = (schema: typeof validationSchema) => void;
export type ValidationKey = keyof typeof validationSchema.shape;

export const validationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .regex(CONSTANTS.nameRegex, 'Only Latin and German letters are allowed')
    .refine((name) => !name.includes(' '), 'Only a single name is allowed'),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .regex(
      CONSTANTS.multiNameRegex,
      'Only Latin and German letters are allowed',
    ),

  dateOfBirth: z
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
  email: z.string().email('Invalid email format'),

  phone: z
    .string()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      'Invalid phone format: phone must match +49... format',
    ),

  loanAmount: numericString('Load Amount').pipe(
    z
      .number()
      .min(CONSTANTS.minLoanAmount, 'Loan amount is too low')
      .max(CONSTANTS.maxLoanAmount, 'Loan amount is too high'),
  ),
  upfrontPayment: numericString('Upfront Payment'),

  terms: numericString('Term').pipe(
    z
      .number()
      .min(CONSTANTS.minTerm, 'term is too low')
      .max(CONSTANTS.maxTerm, 'term is too high'),
  ),

  monthlySalary: numericString('Monthly salary')
    .pipe(z.number().min(1, 'Salary must be greater than 0'))
    .default('0'),

  additionalIncome: numericString('Additional Income').optional().default(0),

  mortgage: numericString('Mortgage').optional().default('0'),

  otherCredits: numericString('credit').optional().default('0'),
  showAdditionalInformation: z.boolean(),
  showMortgage: z.boolean(),
  showOtherCredits: z.boolean(),

  confirm: z
    .boolean()
    .refine((value) => value === true, 'You must confirm to proceed'),
});

export const refinements: Partial<Record<ValidationKey, ValidationReturn>> = {
  upfrontPayment: (schema: typeof validationSchema) =>
    schema.refine((data) => data.upfrontPayment < data.loanAmount, {
      message: 'Upfront payment must be lower than loan amount',
      path: ['upfrontPayment'],
    }),
  terms: (schema: typeof validationSchema) =>
    schema.refine(
      (data) => {
        const dob = new Date(data.dateOfBirth ?? new Date());
        const age = new Date().getFullYear() - dob.getFullYear();
        return age + data.terms / CONSTANTS.maxPeriod <= CONSTANTS.maxAge;
      },
      { message: 'Loan term + age must be under 80 years', path: ['terms'] },
    ),
  confirm: (schema: typeof validationSchema) =>
    schema.refine((data) => {
      const additionalIncome = data.showAdditionalInformation
        ? data.additionalIncome
        : 0;
      const otherCredits = data.showOtherCredits ? data.otherCredits : 0;
      const mortgage = data.showMortgage ? data.mortgage : 0;

      const availableFunds =
        (data.monthlySalary + additionalIncome - mortgage - otherCredits) *
        data.terms *
        0.5;
      return availableFunds > data.loanAmount;
    }, 'Insufficient funds; reduce loan amount or restart with new applicant'),
};
