'use client';

import React, { memo, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { CloseIcon, MinusIcon, PlusIcon, TrashIcon } from '../icons/Icons';
import {
  useCartItems,
  useCartActions,
  useCartToggle,
  useCartTotals,
} from '@/context/Cart/PurchaseContextOptimized';

// Animations from Library
import { AnimatePresence, motion } from 'framer-motion';

// Componente memoizado para cada item del carrito
const CartItem = memo(({ item, onUpdateQuantity, onRemove }) => {
  const handleIncrement = useCallback(() => {
    onUpdateQuantity(
      item.id,
      item.selectedSize,
      item.selectedColor,
      item.quantity + 1
    );
  }, [
    item.id,
    item.selectedSize,
    item.selectedColor,
    item.quantity,
    onUpdateQuantity,
  ]);

  const handleDecrement = useCallback(() => {
    if (item.quantity > 1) {
      onUpdateQuantity(
        item.id,
        item.selectedSize,
        item.selectedColor,
        item.quantity - 1
      );
    }
  }, [
    item.id,
    item.selectedSize,
    item.selectedColor,
    item.quantity,
    onUpdateQuantity,
  ]);

  const handleRemove = useCallback(() => {
    onRemove(item.id, item.selectedSize, item.selectedColor);
  }, [item.id, item.selectedSize, item.selectedColor, onRemove]);

  const itemTotal = useMemo(() => {
    return (item.price * item.quantity).toFixed(2);
  }, [item.price, item.quantity]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex items-center space-x-4 border-b border-gray-700 pb-4"
    >
      <div className="h-16 w-16 overflow-hidden rounded bg-gray-700">
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        )}
      </div>

      <div className="flex-1">
        <h4 className="font-medium text-white">{item.title}</h4>
        <p className="text-sm text-gray-400">
          {item.selectedSize && `Talla: ${item.selectedSize}`}
          {item.selectedColor && ` • Color: ${item.selectedColor}`}
        </p>
        <p className="font-semibold text-green-400">${itemTotal}</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={handleDecrement}
          className="rounded bg-gray-700 p-1 text-white hover:bg-gray-600"
          disabled={item.quantity <= 1}
        >
          <MinusIcon className="h-4 w-4" />
        </button>

        <span className="w-8 text-center text-white">{item.quantity}</span>

        <button
          onClick={handleIncrement}
          className="rounded bg-gray-700 p-1 text-white hover:bg-gray-600"
        >
          <PlusIcon className="h-4 w-4" />
        </button>

        <button
          onClick={handleRemove}
          className="ml-2 rounded bg-red-600 p-1 text-white hover:bg-red-700"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
});

CartItem.displayName = 'CartItem';

// Componente memoizado para el resumen del carrito
const CartSummary = memo(
  ({ totalPrice, onCheckout, onClearCart, itemCount }) => (
    <div className="border-t border-gray-700 pt-4">
      <div className="mb-4 flex justify-between text-lg font-semibold text-white">
        <span>Total:</span>
        <span className="text-green-400">${totalPrice}</span>
      </div>

      <div className="space-y-2">
        <button
          onClick={onCheckout}
          className="w-full rounded bg-green-600 py-3 text-white transition hover:bg-green-700"
        >
          Proceder al Checkout
        </button>

        <button
          onClick={onClearCart}
          className="w-full rounded bg-red-600 py-2 text-white transition hover:bg-red-700"
        >
          Vaciar Carrito
        </button>
      </div>
    </div>
  )
);

CartSummary.displayName = 'CartSummary';

// Componente principal del carrito optimizado
const Cart = memo(() => {
  const router = useRouter();
  const cartItems = useCartItems();
  const { updateQuantity, removeItem, clearCart } = useCartActions();
  const { isCartOpen, closeCart } = useCartToggle();
  const { totalPrice, itemCount } = useCartTotals();

  const proceedToCheckout = useCallback(async () => {
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error al iniciar checkout:', error);
    }
  }, [cartItems]);

  // Memoizar la función de overlay click
  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        closeCart();
      }
    },
    [closeCart]
  );

  // No renderizar si el carrito está cerrado
  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
        onClick={handleOverlayClick}
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          exit={{ y: -20 }}
          className="relative max-h-[90vh] w-full max-w-md overflow-hidden rounded-lg bg-gray-800 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-700 p-4">
            <h2 className="text-xl font-bold text-white">
              Carrito ({itemCount} {itemCount === 1 ? 'artículo' : 'artículos'})
            </h2>
            <button
              onClick={closeCart}
              className="rounded p-2 text-gray-400 transition hover:bg-gray-700 hover:text-white"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex max-h-[calc(90vh-140px)] flex-col">
            {cartItems.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <p className="mb-4 text-gray-400">Tu carrito está vacío</p>
                <button
                  onClick={closeCart}
                  className="rounded bg-green-600 px-6 py-2 text-white transition hover:bg-green-700"
                >
                  Seguir Comprando
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    <AnimatePresence>
                      {cartItems.map((item, index) => (
                        <CartItem
                          key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                          item={item}
                          onUpdateQuantity={updateQuantity}
                          onRemove={removeItem}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Summary */}
                <div className="p-4">
                  <CartSummary
                    totalPrice={totalPrice}
                    onCheckout={proceedToCheckout}
                    onClearCart={clearCart}
                    itemCount={itemCount}
                  />
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

Cart.displayName = 'Cart';

export default Cart;
