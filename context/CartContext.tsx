import { createContext, useContext, useState } from "react";

type CartContextType = {
  count: number;
  setCount: (count: number) => void;
};

const CartContext = createContext<CartContextType>({
  count: 0,
  setCount: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  return (
    <CartContext.Provider value={{ count, setCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
