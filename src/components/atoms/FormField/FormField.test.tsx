import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';
import { FormKey, FormStep, UserData } from '@/utils/types';
import { useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';

type TestWrapperProps = {
  name: keyof UserData;
  type: FormStep['content'][number]['type'];
  error?: string;
  label?: string;
};

describe('FormField', () => {
  const TestWrapper = ({ name, error, type, label }: TestWrapperProps) => {
    const methods = useForm<UserData>();
    return (
      <FormField
        name={name}
        label={label ?? 'Text Label'}
        type={type}
        register={methods.register(name)}
        error={error}
        methods={methods}
      />
    );
  };

  it('displays error message if there is one', () => {
    render(
      <TestWrapper name={FormKey.Phone} type="number" error="Error Message" />,
    );

    expect(screen.getByRole('spinbutton')).toBeVisible();
    expect(screen.getByText('Error Message')).toBeVisible();
  });

  describe('When the field is not an optional field', () => {
    it('renders an input field when the type text', () => {
      render(
        <TestWrapper
          name={FormKey.FirstName}
          type={'text'}
          label="First Name"
        />,
      );

      expect(screen.getByLabelText('First Name')).toBeVisible();
      expect(screen.getByRole('textbox')).toBeVisible();
    });

    it('renders an input field when the type checkbox', () => {
      render(
        <TestWrapper
          name={FormKey.Confirm}
          type={'checkbox'}
          label="Confirm Provided Data"
        />,
      );

      expect(screen.getByText('Confirm Provided Data')).toBeVisible();
      expect(screen.getByRole('checkbox')).toBeVisible();
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });
  });

  describe('When the field is an optional field', () => {
    it('renders a checkbox', () => {
      render(
        <TestWrapper
          name={FormKey.AdditionalIncome}
          type="text"
          label="Additional Income"
        />,
      );

      expect(screen.getByText('Include Additional Income')).toBeVisible();
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    it('shows an input field if the checkbox is checked', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper
          name={FormKey.AdditionalIncome}
          type="number"
          label="Additional Income"
        />,
      );

      expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument();
      await user.click(screen.getByRole('checkbox'));
      expect(screen.getByRole('spinbutton')).toBeVisible();
    });
  });
});
