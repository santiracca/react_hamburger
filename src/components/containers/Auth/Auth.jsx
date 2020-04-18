import React, { Component } from "react";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import styles from "./Auth.module.css";
import { connect } from "react-redux";
import { authStart } from "../../../store/actions/auth";
class Auth extends Component {
  state = {
    isSignUp: true,
    authForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
        errorMessage: "Please enter a valid email",
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
        errorMessage: "Please enter a valid password",
      },
    },
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.minLength && isValid;
    }
    return isValid;
  };

  inputChangedHandler = (event, inputId) => {
    const updatedAuthForm = {
      ...this.state.authForm,
      [inputId]: {
        ...this.state.authForm[inputId],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.authForm[inputId].validation
        ),
        touched: true,
      },
    };
    this.setState({
      authForm: updatedAuthForm,
    });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.authForm.email.value,
      this.state.authForm.password.value,
      this.state.isSignUp
    );
  };

  switchAuthState = () => {
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.authForm) {
      formElementsArray.push({
        id: key,
        config: this.state.authForm[key],
      });
    }

    const form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        touched={formElement.config.touched}
        shouldValidate={formElement.config.validation}
        errorMessage={formElement.config.errorMessage}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    return (
      <div className={styles.Auth}>
        <form onSubmit={this.onSubmitHandler}>
          {form}
          <Button btnType='Success'>Submit</Button>
          <Button btnType='Danger' clicked={this.switchAuthState}>
            Switch to {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(authStart(email, password, isSignup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
