'use client';

import useIsPWA from '@/hooks/useIsPWA';
import {
  HomeIcon,
  MenuIcon,
  ShoppingBagIcon,
  UserIcon,
} from '../../icons/Icons';
import { useRouter } from 'next/navigation';

function BottomNavBar() {
  const isPWA = useIsPWA();
  const router = useRouter();

  if (isPWA === null) return null;

  const items = [
    { icon: HomeIcon, label: 'Home' },
    { icon: UserIcon, label: 'Cuenta' },
    { icon: ShoppingBagIcon, label: 'Carrito' },
    { icon: MenuIcon, label: 'Menu' },
  ];

  return (
    <div
      className={`fixed bottom-0 left-0 z-50 flex h-[70px] w-full justify-between border-t border-gray-700 bg-[#101833] px-10 pt-2 ${
        isPWA ? 'pb-20' : 'pb-8'
      } text-white lg:hidden`}
    >
      {items.map(({ icon: Icon, label }, index) => (
        <button
          key={index}
          onClick={() => {
            if (label === 'Home') {
              router.push('/');
            } else if (label === 'Cuenta') {
              console.log('Cuenta Abierto');
            } else if (label === 'Carrito') {
              console.log('Carrito Abierto');
            } else if (label === 'Menu') {
              console.log('Menu Abierto');
            }
          }}
          className="flex h-fit w-fit cursor-pointer flex-col items-center justify-center gap-1 text-xs text-white hover:text-blue-400"
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

export default BottomNavBar;
