export const PURCHASE_BURGER_SUCCESS = "PURCHASE_BURGER_SUCCESS";
export const PURCHASE_BURGER_FAIL = "PURCHASE_BURGER_FAIL";
export const PURCHASE_BURGER_START = "PURCHASE_BURGER_START";
export const PURCHASE_BURGER = "PURCHASE_BURGER";
export const PURCHASE_INIT = "PURCHASE_INIT";
export const FETCH_ORDERS_START = "FETCH_ORDERS_START";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAIL = "FETCH_ORDERS_FAIL";
export const FETCH_ORDERS = "FETCH_ORDERS";

export const fetchOrdersSuccess = (orders) => {
  return { type: FETCH_ORDERS_SUCCESS, payload: orders };
};

export const fetchOrderFail = (error) => {
  return { type: FETCH_ORDERS_FAIL, error };
};

export const fetchOrdersStart = () => {
  return {
    type: FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return {
    type: FETCH_ORDERS,
    token,
    userId,
  };
};

export const purchaseBurgerStart = () => {
  return { type: PURCHASE_BURGER_START };
};

export const purchaseBurgerSuccess = (id, orderData) => {
  return { type: PURCHASE_BURGER_SUCCESS, orderId: id, orderData };
};

export const purchaseBurgerFail = (error) => {
  return { type: PURCHASE_BURGER_FAIL, error };
};

export const purchaseBurger = (orderData, token) => {
  return {
    type: PURCHASE_BURGER,
    orderData,
    token,
  };
};

export const purchaseInit = () => {
  return {
    type: PURCHASE_INIT,
  };
};
