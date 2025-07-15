'use client';

import { useBadge } from '../context/BadgeContext';

export default function Badges({ product }) {
  const { getBadges, discountCalculation } = useBadge();

  if (!product) return null;

  const badges = getBadges(product);

  return (
    <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
      {badges.includes('new') && (
        <span className="animate-scale-in rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900">
          NEW
        </span>
      )}
      {badges.includes('discount') && (
        <span className="animate-scale-in rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white">
          -{discountCalculation(product)}%
        </span>
      )}
    </div>
  );
}
