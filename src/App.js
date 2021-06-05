import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { isUserLoggedIn, updateCart } from "./actions";
import "./App.css";
import { CartPage } from "./containers/CartPage";
import HomePage from "./containers/HomePage";
import { ProductListPage } from "./containers/ProductListPage";

import CheckoutPage from "./containers/CheckoutPage";
import { ProductDetailsPage } from "./containers/ProductDetailsPage";
import OrderPage from "./containers/OrderPage";
function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    // eslint-disable-next-line
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(updateCart());
    // eslint-disable-next-line
  }, [auth.authenticate])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/cart" exact component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/account/orders" component={OrderPage} />
          {/* <Route path="/order_details/:orderId" component={OrderDetailsPage} /> */}
          <Route path="/:productSlug/:productId/p" component={ProductDetailsPage} />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
