import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckoutSummary from "../../Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {
  const ingredients = useSelector((state) => state.burger.ingredients);
  const purchased = useSelector((state) => state.orders.purchased);

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinueHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  let summary = <Redirect to='/' />;

  if (ingredients) {
    const purchasedRedirect = purchased ? <Redirect to='/' /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          onCheckoutCancel={checkoutCancelledHandler}
          onCheckoutContinue={checkoutContinueHandler}
          ingredients={ingredients}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};

export default Checkout;
