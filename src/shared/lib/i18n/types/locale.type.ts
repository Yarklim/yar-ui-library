import { localesKey } from '../constants/languages.constants';

export type Locale = (typeof localesKey)[number];

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && localesKey.includes(value as Locale);
}
