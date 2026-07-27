import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "zvezda-cart";

function readStoredCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readStoredCart);
  const [toasts, setToasts] = useState([]);

  function showToast(message) {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
  }

  function dismissToast(id) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  function saveCart(nextCart) {
    setCart(nextCart);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCart));
    } catch {
      // localStorage may be unavailable (private browsing, quota) - cart still works for this session
    }
  }

  function addToCart(product) {
    if (!product.available) return;
    const nextCart = cart.some((item) => item.id === product.id)
      ? cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      : [
          ...cart,
          {
            id: product.id,
            title: product.title,
            subtitle: product.subtitle,
            price: product.price,
            unit: product.unit,
            image: product.image,
            quantity: 1,
          },
        ];
    saveCart(nextCart);
    showToast(`${product.title} е добавен в количката`);
  }

  function changeQuantity(productId, amount) {
    const nextCart = cart
      .map((item) => (item.id === productId ? { ...item, quantity: item.quantity + amount } : item))
      .filter((item) => item.quantity > 0);
    saveCart(nextCart);
  }

  function removeFromCart(productId) {
    saveCart(cart.filter((item) => item.id !== productId));
  }

  function clearCart() {
    saveCart([]);
  }

  const totals = useMemo(() => {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = subtotal >= 100 ? subtotal * 0.1 : 0;
    return { count, subtotal, discount, total: subtotal - discount };
  }, [cart]);

  const value = { cart, totals, addToCart, changeQuantity, removeFromCart, clearCart, toasts, dismissToast };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
