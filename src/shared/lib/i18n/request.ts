import * as rootParams from 'next/root-params';
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { MESSAGE_FILES } from './constants/message-files.constant';

import { isLocale, type Locale } from './types/locale.type';

async function getMessages(locale: Locale) {
  switch (locale) {
    case 'en':
      return (await import(`./messages/en/${MESSAGE_FILES.COMMON}.json`))
        .default;

    case 'uk':
      return (await import(`./messages/uk/${MESSAGE_FILES.COMMON}.json`))
        .default;
  }
}

export default getRequestConfig(async ({ locale }) => {
  const requestedLocale = locale ?? (await rootParams.locale());

  if (!isLocale(requestedLocale)) {
    notFound();
  }

  return {
    locale: requestedLocale,
    messages: await getMessages(requestedLocale),
  };
});
