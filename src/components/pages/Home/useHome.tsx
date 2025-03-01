import { useForm } from 'react-hook-form';
import { apiCall } from '@/utils/apiCall';
import { CONSTANTS } from '@/utils/constants';
import { defaultFormData } from '@/utils/defaultFormData';
import { formStepsByCategory } from '@/utils/formUtils/steps';
import { zodResolver } from '@hookform/resolvers/zod';
import { LocalStorage } from '@/utils/localStorage';
import { FormKey, FormState, Status, StepId, UserData } from '@/utils/types';
import { useMemo, useState } from 'react';
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
  };

  const [formState, setFormState] = useState<FormState>(defaultFormState);

  function onClickBack(activeStepId: StepId) {
    const result = Object.entries(formStepsByCategory).find(
      ([, step]) => step.next === activeStepId,
    );

    if (!result) return;

    const [id, { index }] = result;

    setFormState((prev) => ({
      ...prev,
      index,
      activeStepId: id as StepId,
    }));
  }

  const defaultValues = useMemo(() => {
    const storedFormState = LocalStorage.get(CONSTANTS.formKey);

    if (storedFormState?.formId) {
      (async () => {
        try {
          const baseUserData = await apiCall<string>({
            path: `entries/${storedFormState.formId}`,
            method: 'GET',
          });

          setFormState(storedFormState);
          return JSON.parse(baseUserData) as UserData;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_error) {
          return defaultFormData;
        }
      })();
    } else {
      return defaultFormData;
    }
  }, []);

  const methods = useForm<UserData>({
    resolver: zodResolver(
      fieldsToValidate(formStepsByCategory[formState.activeStepId].keys),
    ),
    defaultValues,
  });

  async function onSubmit(fieldsToValidate: Array<FormKey>) {
    const formData = methods.getValues();

    const result = validateSelectedFields(formData, fieldsToValidate);

    if (result.success) {
      setFormState((prev) => ({
        ...prev,
        status: Status.Loading,
      }));

      try {
        const newData = formState.index === 0 && !formState.formId;
        const method = newData ? 'POST' : 'PATCH';
        const path = newData ? 'entities' : `entities/${formState.formId}`;

        const apiResult = await apiCall<string>({
          path,
          method,
          data: JSON.stringify(methods.getValues()),
        });

        setFormState((prev) => ({
          ...prev,
          status: Status.Success,
          formId: newData ? apiResult : prev.formId,
          // formId: '',
        }));

        LocalStorage.set(CONSTANTS.formKey, formState);

        const nextStep = formStepsByCategory[formState.activeStepId].next;
        if (nextStep) {
          setFormState((prev) => ({
            ...prev,
            index: formStepsByCategory[nextStep].index,
            activeStepId: nextStep,
          }));
        } else {
          setFormState(defaultFormState);
          LocalStorage.remove(CONSTANTS.formKey);
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_error) {
        setFormState((prev) => ({ ...prev, status: Status.Error }));
      }
    }
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
