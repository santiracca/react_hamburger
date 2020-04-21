import React, { useEffect } from "react";

import Order from "../../Order/Order";
import axios from "../../../axios-orders";

import WithErrorHandler from "../../../HOC/WithErrorHandler/WithErrorHandler";
import { fetchOrders } from "../../../store/actions/order";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../UI/Spinner/Spinner";

const Orders = (props) => {
  const ordersData = useSelector((state) => state.orders.orders);
  const loading = useSelector((state) => state.orders.loading);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders(token, userId));
  }, [dispatch, token, userId]);

  let orders = <Spinner />;
  if (!loading) {
    orders = ordersData.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price}
      />
    ));
  }
  return <div>{orders}</div>;
};

export default WithErrorHandler(Orders, axios);
