import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';
import { useHome } from './useHome';
import { Status, StepId } from '@/utils/types';
jest.mock('@/utils/localStorage');

describe('useHome', () => {
  it('should initialize with default form state', () => {
    const { result } = renderHook(() => useHome());

    expect(result.current.formState).toEqual({
      activeStepId: StepId.PersonalInformation,
      index: 0,
      status: Status.Rest,
      formId: null,
    });
  });

  it('should handle "Back" button click', () => {
    const { result } = renderHook(() => useHome());

    act(() => {
      result.current.onClickBack(StepId.ContactDetails);
    });

    expect(result.current.formState.activeStepId).toBe(
      StepId.PersonalInformation,
    );
  });

  // it('should handle form submission', async () => {
  //   const { result } = renderHook(() => useHome());
  // });
});
