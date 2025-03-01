import { defaultFormData } from '@/utils/defaultFormData';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DataPreview } from './DataPreview';
import { UserData } from '@/utils/types';
import { steps } from '@/utils/formUtils/steps';

describe('DataPreview', () => {
  it('renders the trasnsformed data correctly', () => {
    render(
      <DataPreview
        data={{
          ...defaultFormData,
          firstName: 'fakeName',
          lastName: 'fakeLasttName',
        }}
      />,
    );

    const expectedLabels = steps.flatMap(({ content }) =>
      content.map(({ label }) => label),
    );

    expectedLabels.slice(0, -1).forEach((label) => {
      expect(screen.getByText(`${label} :`)).toBeVisible();
    });

    expect(screen.getByText('fakeName')).toBeVisible();
    expect(screen.getByText('fakeLasttName')).toBeVisible();
  });

  it('renders an empty list when transformed data is empty', () => {
    render(<DataPreview data={{} as UserData} />);

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
