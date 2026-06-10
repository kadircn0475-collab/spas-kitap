'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (book: { id: number; title: string; price: number; quantity: number }) => void;
  removeFromCart: (id: number) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // 1. ADIM: Sepeti ilk başta temiz bir boş dizi olarak başlatıyor
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 2. ADIM: Sayfa tarayıcıya indiğinde hafızada ürün varsa yüklüyoruz
  useEffect(() => {
    const savedCart = localStorage.getItem('spas_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Sepet yüklenirken hata oluştu:", e);
      }
    }
    setIsLoaded(true); 
  }, []);

  ///hafızayı taze tutmak için 
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('spas_cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (book: { id: number; title: string; price: number; quantity: number }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === book.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + book.quantity } : item
        );
      }

      return [...prevCart, book];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      if (updatedCart.length === 0) {
        localStorage.removeItem('spas_cart');
      }
      return updatedCart;
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart mutlaka bir CartProvider içinde kullanılmalıdır!');
  }
  return context;
}