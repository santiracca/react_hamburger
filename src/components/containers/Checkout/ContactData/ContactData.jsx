import React, { useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../../UI/Button/Button";
import Spinner from "../../../UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import Input from "../../../UI/Input/Input";
import { purchaseBurger } from "../../../../store/actions/order";
import WithErrorHandler from "../../../../HOC/WithErrorHandler/WithErrorHandler";
import { checkValidity } from "../../../../shared/utility";
import axios from "../../../../axios-orders";

const contactFormInitialState = {
  orderForm: {
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      errorMessage: "Please enter a name",
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      errorMessage: "Please enter a street",
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Zip code",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
      errorMessage: "Please enter a zip code",
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      errorMessage: "Please enter a country",
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      errorMessage: "Please enter an email",
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      validation: {},
      valid: true,
    },
  },
  formIsValid: false,
};

const INPUT_CHANGE_HANDLER = "INPUT_CHANGE_HANDLER";

const formDataReducer = (state = contactFormInitialState, action) => {
  switch (action.type) {
    case INPUT_CHANGE_HANDLER:
      const updatedOrderForm = {
        ...state.orderForm,
      };
      const updatedFormElement = { ...updatedOrderForm[action.inputId] };
      updatedFormElement.value = action.event.target.value;
      updatedFormElement.valid = checkValidity(
        updatedFormElement.value,
        updatedFormElement.validation
      );
      updatedFormElement.touched = true;
      updatedOrderForm[action.inputId] = updatedFormElement;
      let formIsValid = true;
      for (let inputId in updatedOrderForm) {
        state.formIsValid =
          updatedOrderForm[inputId].valid && state.formIsValid;
      }
      return {
        ...state,
        orderForm: updatedOrderForm,
        formIsValid: formIsValid,
      };
    default:
      return state;
  }
};

const ContactData = () => {
  const { formState, dispatch } = useReducer(
    formDataReducer,
    contactFormInitialState
  );
  const ingredients = useSelector((state) => state.burger.ingredients);
  const price = useSelector((state) => state.burger.totalPrice);
  const loading = useSelector((state) => state.orders.loading);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const reduxDispatch = useDispatch();

  const orderHandler = async (e) => {
    e.preventDefault();
    const formData = {};
    for (let key in formState.orderForm) {
      formData[key] = formState.orderForm[key].value;
    }
    const order = {
      ingredients: ingredients,
      price: price,
      orderData: formData,
      userId: userId,
    };
    try {
      await reduxDispatch(purchaseBurger(order, token));
    } catch (error) {}
  };

  const inputChangedHandler = (event, inputId) => {
    dispatch({ type: INPUT_CHANGE_HANDLER, event, inputId });
  };

  const formElementsArray = [];
  for (let key in formState.orderForm) {
    formElementsArray.push({
      id: key,
      config: formState.orderForm[key],
    });
  }
  let form = (
    <form>
      {formElementsArray.map((el) => (
        <Input
          key={el.id}
          elementType={el.config.elementType}
          elementConfig={el.config.elementConfig}
          value={el.config.value}
          invalid={!el.config.valid}
          touched={el.config.touched}
          shouldValidate={el.config.validation}
          errorMessage={el.config.errorMessage}
          changed={(event) => inputChangedHandler(event, el.id)}
        />
      ))}

      <Button
        disabled={!formState.formIsValid}
        btnType='Success'
        clicked={orderHandler}
      >
        Order
      </Button>
    </form>
  );
  if (loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  );
};

export default WithErrorHandler(ContactData, axios);
