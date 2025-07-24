'use client';

import React, { memo } from 'react';
import GlobalProviders from './AppProviders';
import RouteSpecificProviders from './RouteSpecificProviders';

const OptimizedProviders = memo(({ children }) => {
  return (
    <GlobalProviders>
      <RouteSpecificProviders>{children}</RouteSpecificProviders>
    </GlobalProviders>
  );
});

OptimizedProviders.displayName = 'OptimizedProviders';

export default OptimizedProviders;
