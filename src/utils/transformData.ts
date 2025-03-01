import { excludeKeys, optionalFields } from './formUtils/optionals';
import { steps } from './formUtils/steps';
import { UserData } from './types';

type TransformedData = Record<string, string | boolean | number | Date>;

export function transformData(data: UserData): TransformedData {
  const nameAndLabel = steps.flatMap((step) =>
    step.content.map(({ name, label }) => ({ name, label })),
  );

  const humanReadableData = Object.entries(data).reduce((acc, [key, value]) => {
    const isOptionalKey = Object.keys(optionalFields).includes(key);
    const isVisible =
      isOptionalKey && data[optionalFields[key as keyof UserData]!];

    const dataValue = isOptionalKey && !isVisible ? 0 : value;
    const dataLabel = nameAndLabel.find(({ name }) => name === key);

    if (dataLabel && !excludeKeys.includes(dataLabel.name)) {
      acc[dataLabel.label] = dataValue;
    }

    return acc;
  }, {} as TransformedData);

  return humanReadableData;
}
