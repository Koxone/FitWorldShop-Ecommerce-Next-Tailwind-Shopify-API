import { HomeIcon, MenuIcon, ShoppingBagIcon, UserIcon } from '../icons/Icons';

function BottomNavBar() {
  const items = [
    { icon: HomeIcon, label: 'Home' },
    { icon: UserIcon, label: 'Cuenta' },
    { icon: ShoppingBagIcon, label: 'Carrito' },
    { icon: MenuIcon, label: 'Menú' },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full h-[70px] justify-between border-t border-gray-700 bg-[#101833] px-6 pt-2 pb-6 text-white lg:hidden">
      {items.map(({ icon: Icon, label }, index) => (
        <button
          key={index}
          className="flex cursor-pointer flex-col items-center justify-center gap-1 text-xs text-white hover:text-blue-400"
        >
          <Icon />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

export default BottomNavBar;
