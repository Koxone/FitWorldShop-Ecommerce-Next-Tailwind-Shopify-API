'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('fws_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      const customer = data?.data?.customerAccessTokenCreate?.customerAccessToken;

      if (res.ok && customer) {
        setUser({ email, accessToken: customer.accessToken });
        setIsLoggedIn(true);
        localStorage.setItem(
          'fws_user',
          JSON.stringify({ email, accessToken: customer.accessToken })
        );
        router.push('/auth/dashboard');
      } else {
        const errorMessage =
          data?.data?.customerAccessTokenCreate?.customerUserErrors?.[0]?.message ||
          'Error al iniciar sesión';
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

const signup = async (email, password, firstName, lastName) => {
  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });

    const data = await res.json();
    const customer = data?.data?.customerCreate?.customer;

    if (res.ok && customer) {
      setUser({ email, firstName, lastName });
      setIsLoggedIn(true);
      localStorage.setItem(
        'fws_user',
        JSON.stringify({ email, firstName, lastName })
      );
      router.push('/auth/dashboard');
    } else {
      const errorMessage =
        data?.data?.customerCreate?.customerUserErrors?.[0]?.message ||
        'No se pudo crear el usuario.';
      throw new Error(errorMessage);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};


  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('fws_user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
