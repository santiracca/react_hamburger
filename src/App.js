import React, { useEffect } from "react";
import Layout from "./components/containers/Layout/Layout";
import BurgerBuilder from "./components/containers/BurgerBuilder/BurgerBuilder";

import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Orders from "./components/containers/Orders/Orders";
import Auth from "./components/containers/Auth/Auth";
import Logout from "./components/containers/Auth/Logout";
import { useSelector, useDispatch } from "react-redux";
import { authCheckState } from "./store/actions/auth";
import Checkout from "./components/containers/Checkout/Checkout";

const App = () => {
  const isAuth = useSelector((state) => state.auth.token !== null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);

  let routes = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/' component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  );
  if (isAuth) {
    routes = (
      <Switch>
        <Route exact path='/' component={BurgerBuilder} />
        <Route path='/orders' component={Orders} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' component={Auth} />

        <Redirect to='/' />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};

export default withRouter(App);
