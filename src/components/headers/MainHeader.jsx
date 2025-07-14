'use client';

import generalTextData from '@/data/generalText/generalTextData';
import LogoButton from '../buttons/header/LogoButton';
import HeaderButton from '../buttons/header/HeaderButton';
import { ShoppingBagIcon, UserIcon } from '../icons/Icons';

function MainHeader() {
  return (
    <>
      {/* Top Banner */}
      <div className="bg-gray-800 py-2 text-center text-xs text-gray-300 md:py-2 md:text-sm">
        {generalTextData.header.banner}
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 border-b border-gray-700 bg-gray-900 px-4">
        <div className="grid h-16 w-full grid-cols-[auto_1fr_auto] items-center justify-between pl-5">
          {/* Logo */}
          <LogoButton />
          {/* Desktop Navigation Buttons */}
          <nav className="hidden justify-center space-x-8 lg:flex">
            {/* {categories
              .filter((cat) => allowedValues.includes(cat.value))
              .map(({ label, value }) => (
                <HeaderButton
                  key={label}
                  text={label}
                  onClick={() => handleClickCategorie(value)}
                />
              ))} */}
          </nav>
          {/* Right Icons */}
          <div className="flex items-center justify-end space-x-4">
            <button
              onClick={() => handleClick()}
              className="cursor-pointer p-2 text-gray-300 hover:text-white"
            >
              <UserIcon size={20} />
            </button>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative cursor-pointer p-2 text-gray-300 hover:text-white"
            >
              <ShoppingBagIcon size={20} />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-gray-900">
                {/* {cartItems.length} */}
              </span>
            </button>
          </div>
        </div>
        {/* <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} /> */}
      </header>
    </>
  );
}

export default MainHeader;
