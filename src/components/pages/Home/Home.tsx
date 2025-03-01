import { FormProvider } from 'react-hook-form';
import { Stack, Text } from '@chakra-ui/react';
import { useHome } from './useHome';
import { StepOverview } from '@/components/organisms/StepOverview/StepOverview';

export function Home() {
  const { methods, formState, onRestart, onClickBack, onSubmit } = useHome();

  return (
    <Stack>
      <Text fontSize={'4xl'} fontWeight={'bold'} mb={'6'}>
        BnB Loan Application
      </Text>
      <FormProvider {...methods}>
        <StepOverview
          formState={formState}
          methods={methods}
          onRestart={onRestart}
          onClickBack={onClickBack}
          onSubmit={onSubmit}
        />
      </FormProvider>
    </Stack>
  );
}
