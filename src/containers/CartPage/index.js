import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartItems } from "../../actions";
import Layout from "../../components/Layout";
import { Card } from "../../components/UI/Card";
import { CartItem } from "./CartItem";
import "./style.css";
import { MaterialButton } from "../../components/MaterialUI";

export const CartPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
    // eslint-disable-next-line
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };
  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };
  return (
    <Layout>
      <div className="cartContainer">
        <Card headerLeft={`My Cart`} headerRight={<div>Deliver to</div>} style={{ width: "calc(100% - 400px)", overflow: "hidden" }}>
          {Object.keys(cartItems).map((item, index) => (
            <CartItem
              key={index}
              cartItem={cartItems[item]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
            />
          ))}
          <div
            style={{
              width: "100%",
              display: "flex",
              background: "#ffffff",
              justifyContent: "flex-end",
              boxShadow: "0 0 10px 10px #eee",
              padding: "10px 0",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "250px" }}>
              <MaterialButton
                title="PLACE ORDER"
                onClick={() => props.history.push(`/checkout`)}
              />
            </div>
          </div>
        </Card>
        <Card style={{ width: "380px" }} headerLeft="Price"></Card>
      </div>
    </Layout>
  );
};
