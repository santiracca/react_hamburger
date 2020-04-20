import React, { Component } from "react";
import { connect } from "react-redux";
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

export class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    this.props.onSetAuthRedirectPath("/checkout");
    this.props.onFetchIngredientsHandler();
  }

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push("/auth");
    }
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  closeModalHandler = () => {
    this.setState({ purchasing: false });
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients cant be loaded</p>
    ) : (
      <div style={{ marginTop: "20px" }}>
        <Spinner />
      </div>
    );

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />

          <BuildControls
            ordered={this.purchaseHandler}
            purchasable={this.props.purchasable}
            price={this.props.totalPrice}
            ingredientAdded={(type) => this.props.onAddIngredientHandler(type)}
            ingredientRemoved={(type) =>
              this.props.onRemoveIngredientHandler(type)
            }
            disabled={disabledInfo}
            isAuth={this.props.isAuth}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.totalPrice}
          ingredients={this.props.ingredients}
          cancelOrder={this.closeModalHandler}
          continue={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.closeModalHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    purchasable: state.burger.purchasable,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredientHandler: (type) => dispatch(addIngredient(type)),
    onRemoveIngredientHandler: (type) => dispatch(removeIngredient(type)),
    onFetchIngredientsHandler: () => dispatch(fetchIngredients()),
    onSetAuthRedirectPath: (path) => dispatch(setAuthRedirect(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
