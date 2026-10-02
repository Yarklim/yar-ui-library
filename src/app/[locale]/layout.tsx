import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Geist } from 'next/font/google';

import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

import { routing } from '@/shared/lib/i18n/routing';

import '@styles/globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: 'Yar UI lib',
  description: 'Yar UI lib',
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <NextIntlClientProvider>
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
