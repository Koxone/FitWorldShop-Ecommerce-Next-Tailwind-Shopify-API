'use client';

import React, { useState, useEffect } from 'react';
import { useRenderTracker } from '@/hooks/useRenderTracker';

/**
 * Test component to demonstrate render optimization
 * This will help developers verify that contexts are not causing unnecessary re-renders
 */
export default function RenderOptimizationTest() {
  const [counter, setCounter] = useState(0);
  const [show, setShow] = useState(false);
  
  // Track renders for this component
  useRenderTracker('RenderOptimizationTest', { counter, show });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('🎯 RenderOptimizationTest: Component mounted');
      console.log('📊 To verify optimizations work:');
      console.log('1. Navigate between pages and check console for re-render counts');
      console.log('2. Components should only re-render when their dependencies change');
      console.log('3. Context providers should not cause cascading re-renders');
    }
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <h3 className="font-bold text-green-400 mb-2">🚀 Render Optimization</h3>
      <div className="text-sm space-y-2">
        <p>Counter: {counter}</p>
        <button 
          onClick={() => setCounter(c => c + 1)}
          className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs"
        >
          Increment
        </button>
        <button 
          onClick={() => setShow(!show)}
          className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs ml-2"
        >
          Toggle: {show ? 'ON' : 'OFF'}
        </button>
        <p className="text-xs text-gray-300">
          Check console for render tracking
        </p>
      </div>
    </div>
  );
}