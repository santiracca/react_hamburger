import axios from "../../axios-orders";
import { put } from "redux-saga/effects";
import { getIngredientsSuccess, getIngredientsFail } from "../actions/burger";

export function* fetchIngredientsSaga() {
  try {
    const response = yield axios.get("/ingredients.json");

    const ingredients = yield response.data;
    yield put(getIngredientsSuccess(ingredients));
  } catch (error) {
    yield put(getIngredientsFail(error));
  }
}
