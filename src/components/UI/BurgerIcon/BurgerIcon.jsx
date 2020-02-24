import React from "react";
import classes from "./BurgerIcon.module.css";

const BurgerIcon = props => {
  return (
    <div onClick={props.onOpen} className={classes.DrawerToggle}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default BurgerIcon;
