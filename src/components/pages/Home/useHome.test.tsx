import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';
import { useHome } from './useHome';
import { LocalStorage } from '@/utils/localStorage';
import { Status, StepId } from '@/utils/types';
import { apiCall } from '@/utils/apiCall';
import { CONSTANTS } from '@/utils/constants';

const mockedApiCall = jest.fn();
jest.mock('@/utils/apiCall');
jest.mocked(apiCall).mockResolvedValue(mockedApiCall);

jest.mock('@/utils/localStorage');
const mockedGet = jest.fn();
jest.mocked(LocalStorage).mockImplementation(() => ({
  get: mockedGet,
  remove: jest.fn(),
  set: jest.fn(),
}));

describe('useHome', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  it('should remove form state and reset on restart', async () => {
    const { result } = renderHook(() => useHome());

    act(() => {
      result.current.onRestart();
    });

    expect(LocalStorage.remove).toHaveBeenCalledWith(CONSTANTS.formKey);
    expect(result.current.formState).toEqual({
      status: Status.Rest,
      formId: null,
      activeStepId: StepId.PersonalInformation,
      index: 0,
    });
  });
});
