'use client';

import { useState } from 'react';
import GeneralModal from '@/components/Feedback/Modals/GeneralModal';
import { useShopifyAuthContext } from '@/context/Auth/ShopifyAuthContext';

export default function UsernameModal({ isOpen, onClose }) {
  const { setUsername } = useShopifyAuthContext();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    const trimmed = inputValue.trim();

    if (trimmed.length < 3) {
      setError('El nombre debe tener al menos 3 caracteres');
      return;
    }

    setUsername(trimmed);
    onClose(); 
  };

  return (
    <GeneralModal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 text-center">
        <p className="mb-4 text-lg font-semibold">Elige un nombre de usuario</p>
        <p className="mb-4 text-sm text-gray-400">
          Necesitamos un nombre de usuario para guardar tus productos en la
          wishlist.
        </p>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError('');
          }}
          placeholder="Ingresa un nombre..."
          className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-white focus:ring-2 focus:ring-black focus:outline-none"
        />

        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

        <button
          onClick={handleSave}
          className="w-full cursor-pointer rounded-lg bg-black px-4 py-2 text-white transition-all duration-300 ease-in-out hover:bg-gray-800"
        >
          Guardar y continuar
        </button>
      </div>
    </GeneralModal>
  );
}
