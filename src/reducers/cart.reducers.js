import { cartConstants } from "../actions/constants";

const initState = {
  cartItems: {},
  updateingCart: false,
  error: null,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART_REQUEST:
      state = {
        ...state,
        updatingCart: true,
      };
      break;
    case cartConstants.ADD_TO_CART_SUCCESS:
      state = {
        ...state,
        updatingCart: false,
        cartItems: action.payload.cartItems,
      };
      break;
    case cartConstants.ADD_TO_CART_FAILURE:
      state = {
        ...state,
        updatingCart: false,
        error: action.payload.error,
      };
      break;
    default:
      break;
  }
  return state;
};

export default cartReducer;
