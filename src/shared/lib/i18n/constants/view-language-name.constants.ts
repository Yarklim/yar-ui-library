import type { StaticImageData } from 'next/image';

import { Locale } from '../types/locale.type';

import enLang from '@public/images/usa.webp';
import uaLang from '@public/images/ua.webp';

export const desktopSelectedLocaleName: Record<Locale, string> = {
  en: 'EN',
  uk: 'UA',
};

export const desctopSelectedLocaleName = desktopSelectedLocaleName;

export const mobileSelectedLocaleName: Record<Locale, string> = {
  en: 'English (EN)',
  uk: 'Українська (UA)',
};

export const viewSelectedLocaleFlag: Record<Locale, string | StaticImageData> =
  {
    en: enLang,
    uk: uaLang,
  };

export interface ILocaleList {
  locale: Locale;
  label: string;
  label_mobile: string;
  image: string | StaticImageData;
  alt: string;
  aria_label: string;
}

export const LOCALELIST: ILocaleList[] = [
  {
    locale: 'en',
    label: 'EN',
    label_mobile: 'English (EN)',
    image: enLang,
    alt: 'USA flag',
    aria_label: 'aria_choice_en',
  },
  {
    locale: 'uk',
    label: 'UA',
    label_mobile: 'Українська (UA)',
    image: uaLang,
    alt: 'Ukraine flag',
    aria_label: 'aria_choice_uk',
  },
];
