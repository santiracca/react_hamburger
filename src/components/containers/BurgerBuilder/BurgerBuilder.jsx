import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Aux from "../../../HOC/Aux";
import Burger from "../../Burger/Burger";
import BuildControls from "../../Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Burger/OrderSummary/OrderSummary";
import axios from "../../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";
import WithErrorHandler from "../../../HOC/WithErrorHandler/WithErrorHandler";
import {
  addIngredient,
  removeIngredient,
  fetchIngredients,
} from "../../../store/actions/burger";
import { setAuthRedirect } from "../../../store/actions/auth";

export const BurgerBuilder = (props) => {
  const ingredients = useSelector((state) => state.burger.ingredients);
  const totalPrice = useSelector((state) => state.burger.totalPrice);
  const purchasable = useSelector((state) => state.burger.purchasable);
  const isAuth = useSelector((state) => state.auth.token !== null);

  const [purchasing, setPurchasing] = useState(false);
  const [loading] = useState(false);
  const [error] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthRedirect("/checkout"));
    dispatch(fetchIngredients());
  }, [dispatch]);

  const purchaseHandler = () => {
    if (isAuth) {
      setPurchasing(true);
    } else {
      props.history.push("/auth");
    }
  };

  const purchaseContinueHandler = () => {
    props.history.push("/checkout");
  };

  const closeModalHandler = () => {
    setPurchasing(false);
  };

  const disabledInfo = {
    ...ingredients,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;

  let burger = error ? (
    <p>Ingredients cant be loaded</p>
  ) : (
    <div style={{ marginTop: "20px" }}>
      <Spinner />
    </div>
  );

  if (ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={ingredients} />

        <BuildControls
          ordered={purchaseHandler}
          purchasable={purchasable}
          price={totalPrice}
          ingredientAdded={(type) => dispatch(addIngredient(type))}
          ingredientRemoved={(type) => dispatch(removeIngredient(type))}
          disabled={disabledInfo}
          isAuth={isAuth}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        price={totalPrice}
        ingredients={ingredients}
        cancelOrder={closeModalHandler}
        continue={purchaseContinueHandler}
      />
    );
  }

  if (loading) {
    orderSummary = <Spinner />;
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={closeModalHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default WithErrorHandler(BurgerBuilder, axios);
