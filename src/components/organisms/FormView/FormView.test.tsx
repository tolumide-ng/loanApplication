import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { FormView, Props } from './FormView';
import { FormState, StepId, UserData } from '@/utils/types';
import { steps } from '@/utils/formUtils/steps';

describe('FormView', () => {
  const mockFormState = {
    index: 0,
    activeStepId: StepId.PersonalInformation,
  } as FormState;

  const TestWrapper = ({
    onSubmit = jest.fn(),
    onClickBack = jest.fn(),
    formState = mockFormState,
  }: Partial<Props>) => {
    const methods = useForm<UserData>();

    return (
      <FormView
        submitText="Submit"
        onSubmit={onSubmit}
        onClickBack={onClickBack}
        content={steps[0].content}
        formState={formState}
        methods={methods}
      />
    );
  };

  it('renders the component correctly', () => {
    render(<TestWrapper />);

    expect(screen.getByLabelText('First Name')).toBeVisible();
    expect(screen.getByLabelText('Last Name')).toBeVisible();
    expect(screen.getByLabelText('Date of Birth')).toBeVisible();
    expect(screen.getByRole('button')).toHaveTextContent('Submit');
  });

  it('should display the back button when the user is not on the first form step', () => {
    render(
      <TestWrapper
        formState={{
          ...mockFormState,
          index: 1,
          activeStepId: StepId.ContactDetails,
        }}
      />,
    );

    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Back' })).toHaveTextContent(
      'Back',
    );
    expect(screen.getByRole('button', { name: 'Submit' })).toHaveTextContent(
      'Submit',
    );
  });

  it('calls onClickBack when the back button is clicked', async () => {
    const mockOnClickBack = jest.fn();
    const mockOnSubmit = jest.fn();
    const user = userEvent.setup();

    render(
      <TestWrapper
        formState={{
          ...mockFormState,
          index: 1,
          activeStepId: StepId.ContactDetails,
        }}
        onClickBack={mockOnClickBack}
        onSubmit={mockOnSubmit}
      />,
    );

    expect(mockOnClickBack).not.toHaveBeenCalled();
    expect(mockOnSubmit).not.toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: 'Back' }));

    expect(mockOnClickBack).toHaveBeenCalled();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit when the submit button is clicked', async () => {
    const mockOnClickBack = jest.fn();
    const mockOnSubmit = jest.fn();
    const user = userEvent.setup();

    render(
      <TestWrapper
        formState={{
          ...mockFormState,
          index: 1,
          activeStepId: StepId.ContactDetails,
        }}
        onClickBack={mockOnClickBack}
        onSubmit={mockOnSubmit}
      />,
    );

    expect(mockOnClickBack).not.toHaveBeenCalled();
    expect(mockOnSubmit).not.toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(mockOnSubmit).toHaveBeenCalled();
    expect(mockOnClickBack).not.toHaveBeenCalled();
  });
});
