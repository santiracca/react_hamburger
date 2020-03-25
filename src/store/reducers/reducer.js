import * as actionType from '../actions/actions';

const initialState = {
  ingredients: {
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0,
  },
  totalPrice: 4,
  purchasable: false
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const updatePurchaseState = ingredients => {
  const sum = Object.keys(ingredients)
    .map(igKey => {
      return ingredients[igKey];
    })
    .reduce((sum, el) => {
      return sum + el;
    }, 0);
  return sum
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      const ingredientType = action.payload
      const oldCount = state.ingredients[ingredientType];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
        ...state.ingredients
      };
      updatedIngredients[ingredientType] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[ingredientType];
      const oldPrice = state.totalPrice;
      const newPrice = oldPrice + priceAddition;

      return {
        ...state,
        ingredients: updatedIngredients,
        totalPrice: newPrice,
        purchasable: updatePurchaseState(updatedIngredients) > 0
      }
    case actionType.REMOVE_INGREDIENT:
      const ingredientTypeToBeDeleted = action.payload
      const count = state.ingredients[ingredientTypeToBeDeleted];
      if (count !== 0) {
        const updatedCount = count - 1;
        const updatedIngredientsForDelete = {
          ...state.ingredients
        };
        updatedIngredientsForDelete[ingredientTypeToBeDeleted] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[ingredientTypeToBeDeleted];
        const oldPriceBeforeDelete = state.totalPrice;
        const newPriceBeforeDelete = oldPriceBeforeDelete - priceDeduction;
        return {
          ...state,
          ingredients: updatedIngredientsForDelete,
          totalPrice: newPriceBeforeDelete,
          purchasable: updatePurchaseState(updatedIngredientsForDelete) > 0
        }
      }
      return state;
    default:
      return state;
  }
}


export default reducer