import React from "react";
import CartItem from "../../components/CartItem/CartItem";
import useAppSelector from "../../hooks/redux/useAppSelector";
import cl from "./Cart.module.scss";

const Cart: React.FC = () => {
  const {
    items: cartItems,
    allAmount: cartAmount,
    allCost: cartCost,
  } = useAppSelector((state) => state.cart);
  return (
    <div className={cl.root}>
      <h2>Cart</h2>
      {cartItems.map((item) => (
        <CartItem cartItem={item} key={item.product.id} />
      ))}
    </div>
  );
};

export default Cart;
