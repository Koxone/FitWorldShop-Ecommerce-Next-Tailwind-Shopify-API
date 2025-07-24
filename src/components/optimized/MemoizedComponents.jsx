'use client';

import React, { memo } from 'react';
import MainHeaderOptimized from '@/components/headers/home/MainHeaderOptimized';
import Footer from '@/components/footers/desktop/Footer';
import BottomNavBar from '@/components/footers/mobile/BottomNavBar';
import CartOptimized from '@/components/cart/CartOptimized';

// Memoized header to prevent unnecessary re-renders (already optimized)
const MemoizedHeader = MainHeaderOptimized;

// Memoized footer to prevent unnecessary re-renders
const MemoizedFooter = memo(Footer);
MemoizedFooter.displayName = 'MemoizedFooter';

// Memoized bottom nav to prevent unnecessary re-renders
const MemoizedBottomNav = memo(BottomNavBar);
MemoizedBottomNav.displayName = 'MemoizedBottomNav';

// Memoized cart to prevent unnecessary re-renders (already optimized)
const MemoizedCart = CartOptimized;

export { MemoizedHeader, MemoizedFooter, MemoizedBottomNav, MemoizedCart };
