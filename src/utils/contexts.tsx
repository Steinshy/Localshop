import { createContext, Dispatch, SetStateAction, Context } from "react";

interface CartItem {
    id: number;
    color?: string;
    size?: string;
    discount: number;
    quantity: number;
}

interface CartContextType {
  data: CartItem[];
  update: Dispatch<SetStateAction<CartItem[]>>;
}

export const CartContext: Context<CartContextType> = createContext<CartContextType>({
  data: [],
  update: () => {},
});