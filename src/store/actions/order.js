import axios from '../../axios-orders';

export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL'


export const purchaseBurgerSuccess = (id, orderData) => {
  return { type: PURCHASE_BURGER_SUCCESS, orderId: id, orderData }
}

export const purchaseBurgerFail = (error) => {
  return { type: PURCHASE_BURGER_FAIL, error }
}

export const purchaseBurger = (orderData) => {
  return async dispatch => {
    try {
      const response = await axios.post("/orders.json", orderData)
      dispatch(purchaseBurgerSuccess(response.data, orderData))
    } catch (error) {
      dispatch(purchaseBurgerFail(error))
    }
  }
}