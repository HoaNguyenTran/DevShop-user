import axiosInstance from "../helpers/axios";
import store from "../store";
import { cartConstants } from "./constants";

export const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const res = await axiosInstance.post(`/user/getCartItems`);
      if (res.status === 200) {
        const { cartItems } = res.data;
        if (cartItems) {
          dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems },
          });
        }
      }
    } catch (error) {
      throw error;
    }
  };
};

export const addToCart = (product, newQty = null) => {
  return async (dispatch) => {
    const {
      cart: { cartItems },
      auth,
    } = store.getState();

    const qty = cartItems[product._id]
      ? parseInt(cartItems[product._id].qty + newQty)
      : 1;
    cartItems[product._id] = {
      ...product,
      qty,
    };
    

    if (auth.authenticate) {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const payload = {
        cartItems: [
          {
            product: product._id,
            quantity: qty,
          },
        ],
      };
      const res = await axiosInstance.post(`/user/cart/addtocart`, payload);
      if (res.status === 201) {
        dispatch(getCartItems());
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    dispatch({
      type: cartConstants.ADD_TO_CART,
      payload: { cartItems },
    });
  };
};

export const removeCartItem = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
      const res = await axiosInstance.post(`/user/cart/removeItem`, { payload });
      if (res.status === 202) {
        dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
        dispatch(getCartItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: cartConstants.REMOVE_CART_ITEM_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCart = () => {
  return async (dispatch) => {
    const { auth } = store.getState();
    const cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;

    if (auth.authenticate) {
      localStorage.removeItem("cart");

      if (cartItems) {
        const payload = Object.keys(cartItems).forEach((key, index) => {
          return { quantity: cartItems[key].qty, product: cartItems[key]._id };
        });
        if (Object.keys(cartItems).length > 0) {
          const res = await axiosInstance.post("/user/cart/addtocart", payload);
          if (res.status === 201) {
            dispatch(getCartItems());
          }
        }
      } else {
          dispatch(getCartItems());
      }
    } else {
        if (cartItems) {
            dispatch({
              type: cartConstants.ADD_TO_CART_SUCCESS,
              payload: { cartItems },
            });
          }
    }
  };
};