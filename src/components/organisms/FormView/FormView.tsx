import { FormField } from '@/components/atoms/FormField/FormField';
import {
  FormKey,
  FormState,
  FormStep,
  Status,
  StepId,
  UserData,
} from '@/utils/types';
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';

export type Props = {
  submitText: string;
  onSubmit: (_keys: Array<FormKey>) => Promise<void>;
  content: FormStep['content'];
  formState: FormState;
  onClickBack: (_id: StepId) => void;
  methods: UseFormReturn<UserData>;
};

export function FormView({
  submitText,
  onSubmit,
  content,
  formState,
  onClickBack,
  methods,
}: Readonly<Props>) {
  const keys = content.map((data) => data.name);
  const submittingForm = formState.status === Status.Loading;

  return (
    <Stack
      as="form"
      onSubmit={methods.handleSubmit(async () => {
        await onSubmit(keys);
      })}
      w={{ base: '95%', md: '35%' }}
    >
      {content.map((data) => (
        <Box key={data.name}>
          {
            <FormField
              name={data.name}
              label={data.label}
              error={methods.formState.errors[data.name]?.message}
              register={methods.register(data.name)}
              type={data.type}
              methods={methods}
            />
          }
        </Box>
      ))}

      {formState.activeStepId === StepId.FinancialInformation ? (
        <Text fontSize={'sm'} color={'red'}>
          {formState.formErrors.financialInformation}
        </Text>
      ) : null}

      <Flex mt={'4'} justifyContent={'space-between'}>
        {formState.activeStepId !== StepId.PersonalInformation && (
          <Button
            type="button"
            w={'36'}
            variant={'outline'}
            onClick={() => onClickBack(formState.activeStepId)}
          >
            Back
          </Button>
        )}

        <Button type="submit" w={'36'} ml={'auto'} disabled={submittingForm}>
          {submittingForm ? 'Submitting' : submitText}
        </Button>
      </Flex>
    </Stack>
  );
}
