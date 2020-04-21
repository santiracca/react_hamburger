import axios from "../../axios-orders";
import { put } from "redux-saga/effects";
import {
  fetchOrdersStart,
  fetchOrderFail,
  fetchOrdersSuccess,
  purchaseBurgerStart,
  purchaseBurgerSuccess,
  purchaseBurgerFail,
} from "../actions/order";

export function* purchaseBurgerSaga(action) {
  yield put(purchaseBurgerStart());
  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    yield put(purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch (error) {
    yield put(purchaseBurgerFail(error));
  }
}

export function* getOrdersSaga(action) {
  yield put(fetchOrdersStart());

  const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
  try {
    const response = yield axios.get("/orders.json" + queryParams);

    const fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({
        id: key,
        ...response.data[key],
      });
    }
    yield put(fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(fetchOrderFail(error));
  }
}
