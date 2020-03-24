import React from "react";
import classes from "./Input.module.css";
import Aux from "../../../HOC/Aux";

const Input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <Aux>
          <input
            onChange={props.changed}
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
          />
          {props.invalid && props.shouldValidate && props.touched && (
            <p style={{ color: "red" }}>{props.errorMessage}</p>
          )}
        </Aux>
      );
      break;
    case "textarea":
      inputElement = (
        <Aux>
          <textarea
            onChange={props.changed}
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
          />
          {props.invalid && props.shouldValidate && props.touched && (
            <p>{props.errorMessage}</p>
          )}
        </Aux>
      );
      break;
    case "select":
      inputElement = (
        <select
          onChange={props.changed}
          className={inputClasses.join(" ")}
          value={props.value}
        >
          {props.elementConfig.options.map(op => (
            <option key={op.value} value={op.value}>
              {op.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <Aux>
          <input
            className={classes.InputElement}
            {...props.elementConfig}
            value={props.value}
          />
          {props.invalid && props.shouldValidate && props.touched && (
            <p>{props.errorMessage}</p>
          )}
        </Aux>
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
