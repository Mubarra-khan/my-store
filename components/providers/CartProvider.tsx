"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  gender?: string;
  category?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// ✅ EXPORT KAREIN - YEH IMPORT HOGI
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    // Simple fallback
    return {
      cartItems: [],
      cartCount: 0,
      cartTotal: 0,
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {}
    };
  }
  
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  // ✅ Check if we're on client side
  useEffect(() => {
    setIsClient(true);
    
    // Load from localStorage only on client
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }, []);

  // ✅ Save to localStorage only on client
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isClient]);

  // Calculate cart count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate cart total
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // Increase quantity if item already exists
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add new item with quantity 1
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    if (isClient) {
      localStorage.removeItem('cart');
    }
  };

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ DEFAULT EXPORT
export default CartProvider;