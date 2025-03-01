import { useForm } from 'react-hook-form';
import { apiCall } from '@/utils/apiCall';
import { CONSTANTS } from '@/utils/constants';
import { defaultFormData } from '@/utils/defaultFormData';
import { formStepsByCategory } from '@/utils/formUtils/steps';
import { zodResolver } from '@hookform/resolvers/zod';
import { LocalStorage } from '@/utils/localStorage';
import {
  FormKey,
  FormState,
  PostEntity,
  Status,
  StepId,
  UserData,
} from '@/utils/types';
import { useCallback, useEffect, useState } from 'react';
import {
  fieldsToValidate,
  validateSelectedFields,
} from '@/utils/formUtils/validators';

export function useHome() {
  const defaultFormState = {
    status: Status.Rest,
    formId: null,
    activeStepId: StepId.PersonalInformation,
    index: 0,
    formErrors: {
      [StepId.FinancialInformation]: null,
    },
  };

  const [formState, setFormState] = useState<FormState>(defaultFormState);

  const [loadedData, setLoadedData] = useState<UserData | null>(null);

  const fetchData = useCallback(async (formId: string) => {
    try {
      const { uuid, ...baseUserData } = await apiCall<PostEntity['entity']>({
        path: `entities/${formId}`,
        method: 'GET',
      });

      setFormState((prev) => ({ ...prev, formId: uuid }));
      setLoadedData({ ...defaultFormData, ...baseUserData });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setLoadedData(defaultFormData);
      LocalStorage.remove(CONSTANTS.formKey);
    }
  }, []);

  useEffect(() => {
    const storedFormState = LocalStorage.get(CONSTANTS.formKey);
    if (storedFormState?.formId) {
      fetchData(storedFormState.formId);
    } else {
      setLoadedData(defaultFormData);
    }
  }, [fetchData]);

  const methods = useForm<UserData>({
    resolver: zodResolver(
      fieldsToValidate(formStepsByCategory[formState.activeStepId].keys),
    ),
    defaultValues: loadedData || defaultFormData,
  });

  useEffect(() => {
    if (loadedData) {
      methods.reset(loadedData);
    }
  }, [loadedData, methods]);

  useEffect(() => {
    if (formState.formId) {
      LocalStorage.set(CONSTANTS.formKey, formState);
    }
  }, [formState]);

  function onClickBack(activeStepId: StepId) {
    const result = Object.entries(formStepsByCategory).find(
      ([, step]) => step.next === activeStepId,
    );

    if (result) {
      const [id, { index }] = result;

      setFormState((prev) => ({
        ...prev,
        index,
        activeStepId: id as StepId,
      }));
    }
  }

  async function onSubmit(fieldsToValidate: Array<FormKey>) {
    const formData = methods.getValues();
    const result = validateSelectedFields(formData, fieldsToValidate);
    if (formState.activeStepId === StepId.FinancialInformation) {
      if (!isValidLoanApplication()) return;
    }

    if (result.success) {
      setFormState((prev) => ({
        ...prev,
        status: Status.Loading,
      }));

      try {
        const newData = formState.index === 0 && !formState.formId;
        const method = newData ? 'POST' : 'PATCH';
        const path = newData ? 'entities' : `entities/${formState.formId}`;

        const formData = Object.fromEntries(
          Object.entries(methods.getValues()).filter(([key]) =>
            fieldsToValidate.includes(key as FormKey),
          ),
        );

        const {
          entity: { uuid },
        } = await apiCall<PostEntity>({
          path,
          method,
          data: JSON.stringify(formData),
        });

        setFormState((prev) => ({
          ...prev,
          status: Status.Success,
          formId: newData ? uuid : prev.formId,
        }));

        const nextStep = formStepsByCategory[formState.activeStepId].next;
        if (nextStep) {
          setFormState((prev) => ({
            ...prev,
            index: formStepsByCategory[nextStep].index,
            activeStepId: nextStep,
          }));
        } else {
          onRestart();
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_error) {
        setFormState((prev) => ({ ...prev, status: Status.Error }));
      }
    }
  }

  function isValidLoanApplication() {
    const data = methods.getValues();
    const additionalIncome = data.showAdditionalInformation
      ? data.additionalIncome
      : 0;
    const otherCredits = data.showOtherCredits ? data.otherCredits : 0;
    const mortgage = data.showMortgage ? data.mortgage : 0;

    const availableFunds =
      (data.monthlySalary + additionalIncome - mortgage - otherCredits) *
      data.terms *
      0.5;

    const validLoanApplication = availableFunds > data.loanAmount;

    if (validLoanApplication) {
      setFormState((prev) => ({
        ...prev,
        formErrors: { [StepId.FinancialInformation]: null },
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        formErrors: {
          [StepId.FinancialInformation]:
            'Insufficient funds: Please reduce loan amount or restart with new applicant',
        },
      }));
    }

    return validLoanApplication;
  }

  function onRestart() {
    LocalStorage.remove(CONSTANTS.formKey);
    setFormState(defaultFormState);
    methods.reset(defaultFormData);
  }

  return {
    onSubmit,
    onClickBack,
    methods,
    formState,
    onRestart,
  };
}
