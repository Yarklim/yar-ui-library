import { defineRouting } from 'next-intl/routing';

import { defaultLocale, localesKey } from './constants/languages.constants';

export const routing = defineRouting({
  locales: localesKey,
  defaultLocale,
  localePrefix: 'always',
});
