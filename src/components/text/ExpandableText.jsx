'use client';

import { useState } from 'react';

export default function ExpandableText({ text }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-2 text-sm text-gray-300">
      <div
        className={`transition-all duration-300 ease-in-out ${
          expanded
            ? 'max-h-[200px] overflow-auto'
            : 'line-clamp-5 overflow-hidden'
        }`}
      >
        {text}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="self-start text-xs text-blue-400 hover:underline"
      >
        {expanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
}
