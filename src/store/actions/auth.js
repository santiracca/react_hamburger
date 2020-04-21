export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const SET_AUTH_REDIRECT = "SET_AUTH_REDIRECT";
export const AUTH_INITIATE_LOGOUT = "AUTH_INITIATE_LOGOUT";
export const AUTH_CHECK_TIMEOUT = "AUTH_CHECK_TIMEOUT";
export const AUTH_USER = "AUTH_USER";
export const AUTH_CHECK_STATE = "AUTH_CHECK_STATE";

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: AUTH_CHECK_TIMEOUT,
    expirationTime,
  };
};

export const logout = () => {
  return {
    type: AUTH_INITIATE_LOGOUT,
  };
};

export const logoutSucceed = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    token,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password, isSignup) => {
  return {
    type: AUTH_USER,
    email,
    password,
    isSignup,
  };
};

export const setAuthRedirect = (path) => {
  return {
    type: SET_AUTH_REDIRECT,
    path,
  };
};

export const authCheckState = () => {
  return {
    type: AUTH_CHECK_STATE,
  };
};
