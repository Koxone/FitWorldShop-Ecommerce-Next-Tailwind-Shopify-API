'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ShopifyAuthContext = createContext();

export function ShopifyAuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientNumber, setClientNumber] = useState(null);
  const [username, setUsername] = useState(null);

  const [wishlistedProducts, setWishlistedProducts] = useState([]);

  const login = (accountNumber) => {
    setIsLoggedIn(true);
    setClientNumber(accountNumber);
    localStorage.setItem('shopify_customerId', accountNumber);

    const savedWishlist = localStorage.getItem(`wishlist_${accountNumber}`);
    setWishlistedProducts(savedWishlist ? JSON.parse(savedWishlist) : []);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setClientNumber(null);
    setUsername(null);
    setWishlistedProducts([]);

    localStorage.removeItem('shopify_customerId');
    localStorage.removeItem('shopify_username');
  };

  useEffect(() => {
    const storedCustomerId = localStorage.getItem('shopify_customerId');
    const storedUsername = localStorage.getItem('shopify_username');

    if (storedCustomerId) {
      setClientNumber(storedCustomerId);
      setIsLoggedIn(true);

      const savedWishlist = localStorage.getItem(
        `wishlist_${storedCustomerId}`
      );
      setWishlistedProducts(savedWishlist ? JSON.parse(savedWishlist) : []);
    }

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const accountNumber = params.get('accountnumber');
      const country = params.get('country');

      if (accountNumber) {
        login(accountNumber);
        console.log('Login con accountnumber:', accountNumber);
      } else if (country === 'MX') {
        logout();
        console.log('Logout detectado por URL');
      }
    }
  }, []);

  useEffect(() => {
    if (username) {
      localStorage.setItem('shopify_username', username);
    }
  }, [username]);

  useEffect(() => {
    if (clientNumber) {
      localStorage.setItem(
        `wishlist_${clientNumber}`,
        JSON.stringify(wishlistedProducts)
      );
    }
  }, [wishlistedProducts, clientNumber]);

  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      clientNumber,
      username,
      login,
      logout,
      setUsername,
      wishlistedProducts,
      setWishlistedProducts,
    }),
    [isLoggedIn, clientNumber, username, wishlistedProducts]
  );

  return (
    <ShopifyAuthContext.Provider value={contextValue}>
      {children}
    </ShopifyAuthContext.Provider>
  );
}

export const useShopifyAuthContext = () => useContext(ShopifyAuthContext);
