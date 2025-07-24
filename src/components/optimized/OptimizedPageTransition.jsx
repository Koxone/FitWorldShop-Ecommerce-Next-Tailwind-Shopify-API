'use client';

import React, { memo } from 'react';
import PageTransitionWrapper from '@/components/wrappers/PageTransitionWrapper';

// Wrapper optimizado para transiciones de página
const OptimizedPageTransition = memo(({ children, key }) => {
  return <PageTransitionWrapper key={key}>{children}</PageTransitionWrapper>;
});

OptimizedPageTransition.displayName = 'OptimizedPageTransition';

export default OptimizedPageTransition;
