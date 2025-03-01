import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Checkbox,
} from '@chakra-ui/react';
import { FormKey, FormStep, UserData } from '@/utils/types';
import { UseFormRegisterReturn, UseFormReturn } from 'react-hook-form';
import { optionalFields } from '@/utils/formUtils/optionals';

type Props = {
  name: FormKey;
  label: string;
  type: FormStep['content'][number]['type'];
  register: UseFormRegisterReturn;
  error?: string;
  methods: UseFormReturn<UserData>;
};

export function FormField({
  label,
  type,
  error,
  name,
  methods,
}: Readonly<Props>) {
  const isOptionalField = Object.keys(optionalFields).includes(name);
  const isOptionalFieldChecked =
    isOptionalField && !!methods.watch()[optionalFields[name]!];

  return (
    <FormControl isInvalid={!!error} mb={'6'}>
      {type !== 'checkbox' && <FormLabel>{label}</FormLabel>}

      {isOptionalField && (
        <>
          <Checkbox {...methods.register(optionalFields[name]!)}>
            {`Include ${label}`}
          </Checkbox>

          {isOptionalFieldChecked && (
            <Input mt={'2'} type={type} {...methods.register(name)} />
          )}
        </>
      )}

      {!isOptionalField && type !== 'checkbox' && (
        <Input type={type} {...methods.register(name)} />
      )}

      {!isOptionalField && type === 'checkbox' && (
        <Checkbox {...methods.register(name)}>{label}</Checkbox>
      )}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
}
