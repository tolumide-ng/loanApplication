import { FormProvider } from 'react-hook-form';
import { Stack, Text, ToastId, useToast } from '@chakra-ui/react';
import { useHome } from './useHome';
import { StepOverview } from '@/components/organisms/StepOverview/StepOverview';
import { useEffect, useRef } from 'react';
import { Status } from '@/utils/types';

export function Home() {
  const toast = useToast();
  const toastIdRef = useRef<ToastId | null>(null);

  const { methods, formState, onRestart, onClickBack, onSubmit } = useHome();

  useEffect(() => {
    if (formState.status === Status.Error) {
      toastIdRef.current = toast({
        description: 'Api Error: Please try again later',
        duration: 900,
        status: 'error',
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [toast, formState]);

  return (
    <Stack>
      <Text fontSize={'4xl'} fontWeight={'bold'} mb={'6'}>
        Big Loan Application
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
