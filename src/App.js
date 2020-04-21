import React, { Component } from "react";
import Layout from "./components/containers/Layout/Layout";
import BurgerBuilder from "./components/containers/BurgerBuilder/BurgerBuilder";

import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Orders from "./components/containers/Orders/Orders";
import Auth from "./components/containers/Auth/Auth";
import Logout from "./components/containers/Auth/Logout";
import { connect } from "react-redux";
import { authCheckState } from "./store/actions/auth";
import asyncComponent from "./HOC/async/asyncComponent";
import Checkout from "./components/containers/Checkout/Checkout";

// const asyncCheckout = asyncComponent(() => {
//   return import("./components/containers/Checkout/Checkout");
// });

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
    if (this.props.isAuth) {
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
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
