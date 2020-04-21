export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const FETCH_INGREDIENTS_START = "FETCH_INGREDIENTS_START";
export const FETCH_INGREDIENTS_ERROR = "FETCH_INGREDIENTS_ERROR";
export const FETCH_INGREDIENTS_SUCCESS = "FETCH_INGREDIENTS_SUCCESS";

export const addIngredient = (ingredientName) => {
  return {
    type: ADD_INGREDIENT,
    payload: ingredientName,
  };
};
export const removeIngredient = (ingredientName) => {
  return {
    type: REMOVE_INGREDIENT,
    payload: ingredientName,
  };
};

export const fetchIngredients = () => {
  return {
    type: FETCH_INGREDIENTS_START,
  };
};

export const getIngredientsSuccess = (ingredients) => {
  return {
    type: FETCH_INGREDIENTS_SUCCESS,
    payload: ingredients,
  };
};

export const getIngredientsFail = (error) => {
  return {
    type: FETCH_INGREDIENTS_ERROR,
    payload: error,
  };
};
