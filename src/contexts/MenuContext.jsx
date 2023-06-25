import { createContext, useState } from "react";

export const MenuContext = createContext();
export const MenuProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [discountedItems, setDiscountedItems] = useState(null);
  const totalPrice = cartItems.reduce((acc, curr) => acc + curr.price, 0);
  const totalDeliveryTime = cartItems.reduce(
    (acc, curr) => acc + curr.delivery_time,
    0
  );
  const handleCoupon = () => {
    if (discountedItems === null) {
      setDiscountedItems(totalPrice - 5);
    } else {
      setDiscountedItems(null);
    }
  };
  const handleAddCart = (item) => {
    const containsItem = cartItems.find(({ id }) => id === item.id);
    if (!containsItem) {
      return setCartItems([...cartItems, item]);
    }
  };
  const menuContext = {
    cartItems,
    setCartItems,
    discountedItems,
    setDiscountedItems,
    totalPrice,
    totalDeliveryTime,
    handleAddCart,
    handleCoupon
  };
  return (
    <MenuContext.Provider value={menuContext}>{children}</MenuContext.Provider>
  );
};
