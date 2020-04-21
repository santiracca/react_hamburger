import React, { useState } from "react";
import { useSelector } from "react-redux";
import Aux from "../../../HOC/Aux";
import Toolbar from "../../Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import SideDrawer from "../../Navigation/SideDrawer/SideDrawer";

const Layout = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };
  const sideDrawerOpenHandler = () => {
    setShowSideDrawer(true);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={isAuthenticated}
        openSideDrawer={sideDrawerOpenHandler}
      />
      <SideDrawer
        isAuth={isAuthenticated}
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{children}</main>
    </Aux>
  );
};

export default Layout;
