import axios from '../../axios-orders';



export const FETCH_INGREDIENTS = 'FETCH_INGREDIENTS';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export const FETCH_INGREDIENTS_ERROR = 'FETCH_INGREDIENTS_ERROR';


export const addIngredient = (ingredientName) => {
  return {
    type: ADD_INGREDIENT,
    payload: ingredientName
  }
}
export const removeIngredient = (ingredientName) => {
  return {
    type: REMOVE_INGREDIENT,
    payload: ingredientName
  }
}

export const fetchIngredients = () => {
  return async (dispatch) => {
    let ingredients;
    try {
      const response = await axios.get('/ingredients.json')
      ingredients = response.data
      dispatch({ type: FETCH_INGREDIENTS, payload: ingredients })
    } catch (error) {
      dispatch({ type: FETCH_INGREDIENTS_ERROR, payload: error })
    }
  }
}