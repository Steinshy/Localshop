// React
import { useContext } from "react";

// NextJS
import { usePathname } from "next/navigation";
// Utils
import { CartContext } from "@utils/subProviders";

// Components
import CartCoupons from "@components/cart/cartCoupons";
import CartButtonProcess from "@components/cart/cartButtonProcess";

const CartSummary = () => {
  const pathname: string = usePathname(),
    cartStore = useContext(CartContext);
  const { data: cartData } = cartStore;
  const { attributes } = cartData;
  const { items, totalPrice } = attributes;

  return (
    <div>
      <div className="sticky top-[70px] border-1 p-4 rounded-md bg-background">
        <h2 className="text-2xl font-semibold mb-4 text-foreground text-center">Order summary</h2>
        <div className="grid grid-cols-2 gap-4 text-foreground">
          <p className="text-lg">Shipping:</p>
          <p className="text-lg">0€</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-foreground">
          <p className="text-lg">Taxes:</p>
          <p className="text-lg">0€</p>
        </div>

        {/* COUPONS */}
        <CartCoupons totalPrice={totalPrice} />

          {/* Shipping - Payment Button */}
        <div className="grid grid-cols-2 gap-4">
          <CartButtonProcess pathname={pathname} items={items} />
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
