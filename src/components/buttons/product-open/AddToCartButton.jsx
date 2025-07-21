'use client';

import { CheckIconCart } from '@/components/icons/Icons';
import Image from 'next/image';
import { useState } from 'react';

function AddToCartButton({ onClick }) {
  const [clicked, setClicked] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const handleClick = () => {
    if (clicked) return;

    // Ejecuta la función externa si existe
    if (typeof onClick === 'function') {
      const success = onClick();
      if (!success) return;
    }

    setClicked(true);
    setShowCart(true);

    // Después de 600ms, mostrar check
    setTimeout(() => {
      setShowCart(false);
      setShowCheck(true);
    }, 600);

    // Después de 1s, animación de salida
    setTimeout(() => {
      setAnimateOut(true);
    }, 1000);

    // Restaurar al estado original
    setTimeout(() => {
      setShowCheck(false);
      setAnimateOut(false);
      setClicked(false);
    }, 1600);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative flex-1 cursor-pointer overflow-hidden rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-500 md:text-base ${
        clicked
          ? 'bg-green-500 text-white'
          : 'bg-white text-gray-900 hover:bg-gray-300'
      }`}
    >
      {/* Texto original */}
      <span
        className={`relative z-10 flex items-center justify-center transition-opacity duration-300 ${
          clicked ? 'opacity-0' : 'opacity-100'
        }`}
      >
        Agregar al Carrito
      </span>

      {/* Ícono de carrito */}
      <span
        className={`absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-2xl transition-all duration-300 ${
          showCart
            ? 'scale-100 rotate-[360deg] opacity-100'
            : 'scale-0 opacity-0'
        }`}
      >
        <Image
          src="/carrito.svg"
          alt="Ícono de carrito"
          width={30}
          height={30}
          className="w-[30px]"
        />
      </span>

      {/* Ícono de check */}
      <span
        className={`absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-2xl transition-all duration-400 ${
          showCheck
            ? animateOut
              ? 'translate-y-[-40px] scale-75 opacity-0'
              : 'scale-100 opacity-100'
            : 'scale-0 opacity-0'
        }`}
      >
        <CheckIconCart />
      </span>
    </button>
  );
}

export default AddToCartButton;
