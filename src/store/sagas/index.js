import { takeEvery } from "redux-saga/effects";
import {
  AUTH_INITIATE_LOGOUT,
  AUTH_CHECK_TIMEOUT,
  AUTH_USER,
  AUTH_CHECK_STATE,
} from "../actions/auth";
import { FETCH_INGREDIENTS_START } from "../actions/burger";
import { FETCH_ORDERS, PURCHASE_BURGER } from "../actions/order";
import { fetchIngredientsSaga } from "./burger";
import { getOrdersSaga, purchaseBurgerSaga } from "./order";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from "./auth";

export function* watchAuth() {
  yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(AUTH_USER, authUserSaga);
  yield takeEvery(AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurger() {
  yield takeEvery(FETCH_INGREDIENTS_START, fetchIngredientsSaga);
}

export function* watchOrders() {
  yield takeEvery(FETCH_ORDERS, getOrdersSaga);
  yield takeEvery(PURCHASE_BURGER, purchaseBurgerSaga);
}
