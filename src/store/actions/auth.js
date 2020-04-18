import axios from "axios";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";

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
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRvN0IhSIuwPWVwaYr2BxlrdleR3Y9Znw";

    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBRvN0IhSIuwPWVwaYr2BxlrdleR3Y9Znw";
    }
    axios
      .post(url, authData)
      .then((response) => {
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};
