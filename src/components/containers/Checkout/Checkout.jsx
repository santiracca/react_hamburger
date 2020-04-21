import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "../../Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { purchaseInit } from "../../../store/actions/order";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to='/' />;

    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to='/' />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            onCheckoutCancel={this.checkoutCancelledHandler}
            onCheckoutContinue={this.checkoutContinueHandler}
            ingredients={this.props.ingredients}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    purchased: state.orders.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
