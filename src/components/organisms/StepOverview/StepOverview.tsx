import { steps } from '@/utils/formUtils/steps';
import { FormState, UserData } from '@/utils/types';
import {
  Box,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  Stack,
  StepStatus,
  StepTitle,
  useBreakpointValue,
  Button,
} from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';
import { DataPreview } from '../../molecules/DataPreview';

type Props = {
  formState: FormState;
  methods: UseFormReturn<UserData>;
  onRestart: () => void;
};

export function StepOverview({
  formState,
  methods,
  onRestart,
}: Readonly<Props>) {
  const orientation = useBreakpointValue<'horizontal' | 'vertical'>({
    base: 'vertical',
    md: 'horizontal',
  });

  return (
    <Stack w={'100%'}>
      <Stepper
        index={formState.index}
        size={{ base: 'sm', md: 'md' }}
        colorScheme="red"
        orientation={orientation}
      >
        {steps?.map(({ title }) => (
          <Step key={title}>
            <StepIndicator cursor={'pointer'}>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{title}</StepTitle>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Stack alignItems={'center'} w={'100%'} mt={'10'}>
        <DataPreview data={methods.getValues()} />
      </Stack>

      {formState.formId && (
        <Button
          mt={'12'}
          variant={'outline'}
          color={'black'}
          border={'1px solid black'}
          w={'56'}
          onClick={onRestart}
          alignSelf={'center'}
        >
          Restart Loan Application
        </Button>
      )}
    </Stack>
  );
}
