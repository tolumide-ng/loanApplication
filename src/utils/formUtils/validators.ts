import { FormKey, UserData } from '@/utils/types';
import { refinements, ValidationSchema, validationSchema } from './schema';

export function validateSelectedFields(
  data: UserData,
  fieldsToValidate: FormKey[],
) {
  const selectedSchema = validationSchema.pick(
    Object.fromEntries(
      fieldsToValidate.map((field) => [field, true]),
    ) as Record<keyof ValidationSchema, true>,
  );

  const refinedSchema = fieldsToValidate.reduce(
    (schema, field) => refinements[field]?.(schema) ?? schema,
    selectedSchema,
  );

  return refinedSchema.safeParse(data);
}

export function fieldsToValidate(fieldsToValidate: FormKey[]) {
  const selectedSchema = validationSchema.pick(
    Object.fromEntries(
      fieldsToValidate.map((field) => [field, true]),
    ) as Record<keyof ValidationSchema, true>,
  );

  const refinedSchema = fieldsToValidate.reduce(
    (schema, field) => refinements[field]?.(schema) ?? schema,
    selectedSchema,
  );

  return refinedSchema;
}
