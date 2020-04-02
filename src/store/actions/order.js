import axios from '../../axios-orders';

export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';
export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';
export const PURCHASE_INIT = 'PURCHASE_INIT'
export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS'
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL';

export const fetchOrdersSuccess = (orders) => {
  return { type: FETCH_ORDERS_SUCCESS, payload: orders }
}

export const fetchOrderFail = (error) => {
  return { type: FETCH_ORDERS_FAIL, error }
}

export const fetchOrdersStart = () => {
  return {
    type: FETCH_ORDERS_START
  }
}

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    axios
      .get("orders.json")
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            id: key,
            ...response.data[key]
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch(err => {
        dispatch(fetchOrderFail(err))
      });
  }
}


export const purchaseBurgerStart = () => {
  return { type: PURCHASE_BURGER_START }
}


export const purchaseBurgerSuccess = (id, orderData) => {
  return { type: PURCHASE_BURGER_SUCCESS, orderId: id, orderData }
}

export const purchaseBurgerFail = (error) => {
  return { type: PURCHASE_BURGER_FAIL, error }
}

export const purchaseBurger = (orderData) => {
  return async dispatch => {
    try {
      dispatch(purchaseBurgerStart());
      const response = await axios.post("/orders.json", orderData)
      dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    } catch (error) {
      dispatch(purchaseBurgerFail(error))
    }
  }
}

export const purchaseInit = () => {
  return {
    type: PURCHASE_INIT
  }
}