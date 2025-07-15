'use client';

import { usePurchase } from '@/components/productCard/context/PurchaseContext';
import { useState } from 'react';

function AddToCartButton({ product, selectedSize, selectedColor, quantity }) {
  const { addToCart } = usePurchase();
  const [clicked, setClicked] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Selecciona talla y color antes de agregar al carrito.');
      return false;
    }

    const variant = product.variants.edges.find((variant) =>
      variant.node.selectedOptions.every((option) => {
        const optionName = option.name.toLowerCase().trim();
        const optionValue = option.value.toLowerCase().trim();

        if (optionName === 'color') {
          return optionValue === selectedColor.toLowerCase().trim();
        }
        if (optionName === 'talla') {
          return optionValue === selectedSize.toLowerCase().trim();
        }
        return true;
      })
    );

    if (!variant) {
      alert(
        'No se encontró el variant correspondiente con la talla y color seleccionados.'
      );
      return false;
    }

    const variantId = variant.node.id;

    addToCart({
      id: product.id,
      handle: product.handle,
      title: product.title,
      description: product.description,
      selectedSize,
      selectedColor,
      quantity,
      price: variant.node.price.amount,
      image:
        variant.node.image?.url ||
        product.featuredImage?.url ||
        product.images.edges[0]?.node.url,
      variantId,
    });

    return true;
  };

  const handleClick = () => {
    if (clicked) return;

    const success = handleAddToCart();
    if (!success) return;

    setClicked(true);
    setShowCart(true);

    // Después de 400ms, mostrar check
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
      className={`relative flex-1 cursor-pointer overflow-hidden rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-500 md:text-base ${clicked ? 'bg-green-500 text-white' : 'bg-white text-gray-900 hover:bg-gray-300'}`}
    >
      {/* Texto original */}
      <span
        className={`relative z-10 flex items-center justify-center transition-opacity duration-300 ${clicked ? 'opacity-0' : 'opacity-100'}`}
      >
        Agregar al Carrito
      </span>

      {/* Íconos animados */}
      <span
        className={`absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-2xl transition-all duration-300 ${showCart ? 'scale-100 rotate-[360deg] opacity-100' : 'scale-0 opacity-0'}`}
      >
        <img className="w-[30px]" src="/carrito.svg" alt="" />
      </span>

      <span
        className={`absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-2xl transition-all duration-400 ${showCheck ? (animateOut ? 'translate-y-[-40px] scale-75 opacity-0' : 'scale-100 opacity-100') : 'scale-0 opacity-0'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M20.285 6.709a1 1 0 010 1.414l-9.5 9.5a1 1 0 
    01-1.414 0l-4.5-4.5a1 1 0 011.414-1.414L10 
    15.086l8.871-8.877a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </button>
  );
}

export default AddToCartButton;
