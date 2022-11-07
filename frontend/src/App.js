import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./Pages/Home/Home";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import LoginSignUp from "./Pages/Authentication/LoginSignUp";
import store from "./store";
import { loadUser } from "./Global/actions/userAction";
import { useSelector } from "react-redux";
import Profile from "./Pages/Profile/Profile";
import ProtectedRoute from "./Route/ProtectedRoute";
import UpdateProfile from "./Pages/Profile/UpdateProfile/UpdateProfile";
import UpdatePassword from "./Pages/Profile/UpdatePassword/UpdatePassword";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import ResetPassword from "./Pages/Authentication/ResetPassword";
import Cart from "./Pages/Cart/Cart";
import Shipping from "./Pages/Shipping/Shipping";
import ConfirmOrder from "./Pages/ConfirmOrder/ConfirmOrder";
import axios from "axios";
import Payment from "./Pages/Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./Pages/OrderSuccess/OrderSuccess";
import MyOrders from "./Pages/Order/MyOrders";
import OrderDetails from "./Pages/Order/OrderDetails";
import Dashboard from "./Pages/Admin/Dashboard.js";
import ProductList from "./Pages/Admin/ProductList.js";
import NewProduct from "./Pages/Admin/NewProduct";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import OrderList from "./Pages/Admin/OrderList";
import ProcessOrder from "./Pages/Admin/ProcessOrder";
import UsersList from "./Pages/Admin/UsersList";
import UpdateUser from "./Pages/Admin/UpdateUser";
import ProductReviews from "./Pages/Admin/ProductReviews";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import NotFound from "./Pages/Not Found/NotFound";
import Products from "./component/Product/Products";
import MainLayout from "./component/layout/MainLayout/MainLayout";
import AdminLayout from "./component/layout/AdminLayout/AdminLayout";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Switch>
        //admin rout
        <Route path="/admin/*">
          <AdminLayout>
            <Switch>
              {" "}
              <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/dashboard"
                component={Dashboard}
              />
              <ProtectedRoute
                exact
                path="/admin/products"
                isAdmin={true}
                component={ProductList}
              />
              <ProtectedRoute
                exact
                path="/admin/product"
                isAdmin={true}
                component={NewProduct}
              />
              <ProtectedRoute
                exact
                path="/admin/product/:id"
                isAdmin={true}
                component={UpdateProduct}
              />
              <ProtectedRoute
                exact
                path="/admin/orders"
                isAdmin={true}
                component={OrderList}
              />
              <ProtectedRoute
                exact
                path="/admin/order/:id"
                isAdmin={true}
                component={ProcessOrder}
              />
              <ProtectedRoute
                exact
                path="/admin/users"
                isAdmin={true}
                component={UsersList}
              />
              <ProtectedRoute
                exact
                path="/admin/user/:id"
                isAdmin={true}
                component={UpdateUser}
              />
              <ProtectedRoute
                exact
                path="/admin/reviews"
                isAdmin={true}
                component={ProductReviews}
              />
            </Switch>
          </AdminLayout>
        </Route>
        //main rout
        <Route path="/*">
          <MainLayout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/product/:id" component={ProductDetails} />
              <Route exact path="/category" component={Products} />
              <Route exact path="/search" component={Products} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/about" component={About} />
              //protected routes
              <ProtectedRoute exact path="/profile" component={Profile} />
              <ProtectedRoute
                exact
                path="/profile/update"
                component={UpdateProfile}
              />
              <ProtectedRoute
                exact
                path="/profile/password/update"
                component={UpdatePassword}
              />
              <Route exact path="/password/forgot" component={ForgotPassword} />
              <Route
                exact
                path="/password/reset/:token"
                component={ResetPassword}
              />
              <Route exact path="/login" component={LoginSignUp} />
              <Route exact path="/cart" component={Cart} />
              <ProtectedRoute exact path="/shipping" component={Shipping} />
              <ProtectedRoute
                exact
                path="/order-success"
                component={OrderSuccess}
              />
              <ProtectedRoute exact path="/orders" component={MyOrders} />
              <ProtectedRoute
                exact
                path="/order-confirm"
                component={ConfirmOrder}
              />
              <ProtectedRoute
                exact
                path="/order/:id"
                component={OrderDetails}
              />
              {stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute exact path="/payment" component={Payment} />
                </Elements>
              )}
            </Switch>
            <Footer />
          </MainLayout>
        </Route>
        <Route
          component={window.location.pathname === "/payment" ? null : NotFound}
        />
      </Switch>
    </Router>
  );
}

export default App;
