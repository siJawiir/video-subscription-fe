"use client";

import React, { createContext, useState } from "react";
import { CartContextType } from "../@types/context";

export const CartContext = createContext<
  CartContextType | undefined
>(undefined);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedItems, setSelectedItems] = useState<
    CartContextType["selectedItems"]
  >(null);

  const value: CartContextType = {
    selectedItems,
    setSelectedItems,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
