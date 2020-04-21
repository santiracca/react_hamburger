import axios from "axios";
import { put, delay } from "redux-saga/effects";
import {
  logoutSucceed,
  logout,
  authStart,
  authSuccess,
  authFail,
  checkAuthTimeout,
} from "../actions/auth";

export function* logoutSaga() {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(logout());
}

export function* authUserSaga(action) {
  yield put(authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRvN0IhSIuwPWVwaYr2BxlrdleR3Y9Znw";

  if (!action.isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBRvN0IhSIuwPWVwaYr2BxlrdleR3Y9Znw";
  }
  try {
    const response = yield axios.post(url, authData);
    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(authSuccess(response.data.idToken, response.data.localId));
    yield put(checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga() {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate > new Date()) {
      const userId = yield localStorage.getItem("userId");
      yield put(authSuccess(token, userId));
      yield put(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      yield put(logout());
    }
  }
}
