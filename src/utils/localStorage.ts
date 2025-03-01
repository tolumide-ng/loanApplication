import { FormState } from './types';

export class LocalStorage {
  static get(key: string) {
    const result = localStorage.getItem(key);
    if (result) {
      return JSON.parse(result) as FormState;
    }

    return null;
  }

  static set(key: string, data: FormState) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }
}
