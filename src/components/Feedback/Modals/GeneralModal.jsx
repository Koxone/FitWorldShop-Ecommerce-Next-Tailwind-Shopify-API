'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

export default function GeneralModal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-auto max-h-[500px] w-auto max-w-[500px] overflow-y-auto rounded-lg border border-neutral-500/30 bg-gray-900 text-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-gray-700 px-6 py-4">
              <h2 className="text-lg font-bold">{title}</h2>
              <button
                onClick={onClose}
                className="cursor-pointer text-gray-400 transition hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="px-6 py-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
