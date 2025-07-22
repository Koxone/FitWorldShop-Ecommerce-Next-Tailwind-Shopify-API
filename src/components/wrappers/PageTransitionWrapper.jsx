'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, memo } from 'react';

function PageTransitionWrapper({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="flex min-h-screen flex-col"
      >
        <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
          {children}
        </Suspense>
      </motion.main>
    </AnimatePresence>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(PageTransitionWrapper);
