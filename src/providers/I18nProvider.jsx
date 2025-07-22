'use client';

import { I18nextProvider } from 'react-i18next';
import { memo } from 'react';
import i18n from '@/lib/i18n';

function I18nProvider({ children }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

// Memoize the component to prevent unnecessary re-renders
export default memo(I18nProvider);
