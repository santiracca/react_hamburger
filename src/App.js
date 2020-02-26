import React, { Component } from 'react';
import Layout from './components/containers/Layout/Layout';
import BurgerBuilder from './components/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './components/containers/Checkout/Checkout';

import { Switch, Route } from 'react-router-dom'
import Orders from './components/containers/Orders/Orders';


class App extends Component {
  render() {
    return (

      <div >
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route exact path='/orders' component={Orders} />
            <Route exact path="/" component={BurgerBuilder} />


          </Switch>
        </Layout>
      </div>

    );
  }
}

export default App;
