import React from "react";
import classes from "./Logo.module.css";

import burgerLogo from "../../assets/Images/burger-logo.png";

const Logo = props => {
  return (
    <div className={classes.Logo} style={{ height: props.height }}>
      <img src={burgerLogo} alt='burger' />
    </div>
  );
};

export default Logo;
