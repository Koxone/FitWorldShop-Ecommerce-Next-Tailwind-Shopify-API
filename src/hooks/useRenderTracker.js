'use client';

import { useEffect, useRef } from 'react';

/**
 * Development hook to monitor component re-renders
 * Only active in development mode
 * 
 * @param {string} componentName - Name of the component to track
 * @param {Object} props - Props to track for changes (optional)
 */
export function useRenderTracker(componentName, props = {}) {
  const renderCount = useRef(0);
  const prevProps = useRef(props);

  renderCount.current += 1;

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 [${componentName}] Rendered ${renderCount.current} times`);
      
      // Log prop changes if props are provided
      if (Object.keys(props).length > 0) {
        const changedProps = {};
        Object.keys(props).forEach(key => {
          if (prevProps.current[key] !== props[key]) {
            changedProps[key] = {
              from: prevProps.current[key],
              to: props[key]
            };
          }
        });
        
        if (Object.keys(changedProps).length > 0) {
          console.log(`📝 [${componentName}] Prop changes:`, changedProps);
        }
        
        prevProps.current = props;
      }
    }
  });

  return renderCount.current;
}

/**
 * Development component to display render statistics
 * Only renders in development mode
 */
export function RenderStats({ show = false }) {
  if (process.env.NODE_ENV !== 'development' || !show) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs z-50">
      <div className="font-bold">🚀 Development Mode</div>
      <div>Check console for render tracking</div>
    </div>
  );
}