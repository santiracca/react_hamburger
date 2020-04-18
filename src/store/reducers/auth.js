import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loadign: false,
      };
    case AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
