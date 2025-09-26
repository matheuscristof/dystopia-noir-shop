import { useState, useCallback } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems(current => {
      const existingItem = current.find(
        i => i.id === item.id && i.size === item.size && i.color === item.color
      );

      if (existingItem) {
        return current.map(i =>
          i.id === existingItem.id && i.size === existingItem.size && i.color === existingItem.color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...current, { ...item, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems(current =>
      current.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(current => current.filter(item => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return {
    items,
    isOpen,
    totalItems,
    totalPrice,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    openCart,
    closeCart,
  };
};