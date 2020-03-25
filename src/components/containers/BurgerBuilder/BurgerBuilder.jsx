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
import * as actionTypes from "../../../store/actions/actions";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  // componentDidMount() {
  //   axios
  //     .get("/ingredients.json")
  //     .then(response => {
  //       this.setState({ ingredients: response.data });
  //     })
  //     .catch(err => {
  //       this.setState({ error: true });
  //     });
  // }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  closeModalHandler = () => {
    this.setState({ purchasing: false });
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients cant be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />

          <BuildControls
            ordered={this.purchaseHandler}
            purchasable={this.props.purchasable}
            price={this.props.totalPrice}
            ingredientAdded={type => this.props.onAddIngredientHandler(type)}
            ingredientRemoved={type =>
              this.props.onRemoveIngredientHandler(type)
            }
            disabled={disabledInfo}
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredientHandler: type =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, payload: type }),
    onRemoveIngredientHandler: type =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, payload: type })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
