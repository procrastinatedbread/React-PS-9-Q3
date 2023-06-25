import { useContext } from "react";
import { MenuContext } from "../contexts/MenuContext";

const CartPage = () => {
  const {
    discountedItems,
    totalTime,
    totalPrice,
    cartItems,
    handleCoupon
  } = useContext(MenuContext);

  return (
    <>
      <h1>Cart</h1>
      <h3>Total time: {totalTime} minutes</h3>
      <h3>
        Total Price:
        {discountedItems !== null ? discountedItems : totalPrice}
      </h3>
      <button onClick={handleCoupon}>
        {discountedItems === null ? "Apply coupon" : "Remove coupon"}
      </button>
      {cartItems.map((cartItem) => (
        <div style={{ display: "flex" }}>
          <div key={cartItem.id}>
            <img src={cartItem.image} alt="food" width="250" height="200" />
            <p>description:{cartItem.description}</p>
            <p>price:{cartItem.price}</p>
            <p>time:{cartItem.delivery_time}</p>
          </div>
        </div>
      ))}
    </>
  );
};
export default CartPage;
