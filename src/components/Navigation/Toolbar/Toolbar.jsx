import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import BurgerIcon from "../../UI/BurgerIcon/BurgerIcon";

const Toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <BurgerIcon onOpen={props.openSideDrawer} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
