import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem } from '../data/menuItems';

interface BasketContextType {
  items: (MenuItem & { selectedOptions?: string[] })[];
  addItem: (item: MenuItem & { selectedOptions?: string[] }) => void;
  removeItem: (itemId: number) => void;
  clearBasket: () => void;
  totalItems: number;
  totalCalories: number;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};

interface BasketProviderProps {
  children: ReactNode;
}

export const BasketProvider: React.FC<BasketProviderProps> = ({ children }) => {
  const [items, setItems] = useState<(MenuItem & { selectedOptions?: string[] })[]>([]);

  const addItem = (item: MenuItem & { selectedOptions?: string[] }) => {
    setItems(prevItems => [...prevItems, item]);
  };

  const removeItem = (itemId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const clearBasket = () => {
    setItems([]);
  };

  const totalItems = items.length;
  const totalCalories = items.reduce((sum, item) => sum + item.calories, 0);

  return (
    <BasketContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearBasket,
        totalItems,
        totalCalories
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}; 