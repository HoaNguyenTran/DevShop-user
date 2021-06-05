
import categoryReducer from "./category.reducers";
import { combineReducers } from "redux";
import { productReducer } from "./product.reducers";
import authReducer from "./auth.reducers";
import cartReducer from "./cart.reducers";
import userReducer from "./user.reducers";

const rootReducers = combineReducers({
    category: categoryReducer,
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    user: userReducer,
})

export default rootReducers;