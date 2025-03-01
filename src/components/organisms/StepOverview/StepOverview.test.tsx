import { FormState, StepId, UserData } from '@/utils/types';
import '@testing-library/jest-dom';
import { UseFormReturn } from 'react-hook-form';
import { render, screen } from '@testing-library/react';
import { defaultFormData } from '@/utils/defaultFormData';
import userEvent from '@testing-library/user-event';
import { StepOverview } from './StepOverview';
import { steps } from '@/utils/formUtils/steps';

const mockMethods = {
  setValue: jest.fn(),
  handleSubmit: jest.fn(),
  watch: jest.fn(),
  control: {} as unknown,
  register: jest.fn(),
  formState: {
    errors: {},
  },
  getValues: () => jest.fn().mockReturnValue(defaultFormData),
} as unknown as UseFormReturn<UserData>;

const mockFormState = {
  index: 0,
  activeStepId: StepId.PersonalInformation,
} as FormState;

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useBreakpointValue: jest.fn(),
}));

describe('StepOverview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component correctly', () => {
    render(
      <StepOverview
        onSubmit={jest.fn()}
        onClickBack={jest.fn()}
        formState={mockFormState}
        methods={mockMethods}
        onRestart={jest.fn()}
      />,
    );

    steps.forEach((step) => {
      expect(screen.getByText(step.title)).toBeVisible();
    });
    expect(screen.getByRole('button', { name: 'Next' })).toBeVisible();
    expect(
      screen.queryByRole('button', { name: 'Restart Loan Application' }),
    ).not.toBeInTheDocument();
  });

  it('renders confirm checkbox when activeStepId is "Confirm"', () => {
    render(
      <StepOverview
        onSubmit={jest.fn()}
        onClickBack={jest.fn()}
        formState={{ ...mockFormState, activeStepId: StepId.Confirm, index: 4 }}
        methods={mockMethods}
        onRestart={jest.fn()}
      />,
    );

    expect(screen.getByRole('checkbox')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Finalize' })).toBeVisible();
  });

  it('renders the "Restart Loan Application Button" when the form is active', async () => {
    const mockOnRestart = jest.fn();
    const user = userEvent.setup();

    render(
      <StepOverview
        onSubmit={jest.fn()}
        onClickBack={jest.fn()}
        formState={{
          ...mockFormState,
          formId: 'someUuid',
        }}
        methods={mockMethods}
        onRestart={mockOnRestart}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Restart Loan Application' }),
    ).toHaveTextContent('Restart Loan Application');

    expect(mockOnRestart).not.toHaveBeenCalled();

    await user.click(
      screen.getByRole('button', { name: 'Restart Loan Application' }),
    );

    expect(mockOnRestart).toHaveBeenCalledTimes(1);
  });
});
