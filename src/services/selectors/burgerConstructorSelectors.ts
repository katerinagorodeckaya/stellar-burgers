import { RootState } from '../store';
import { TIngredient } from '@utils-types';
import { TConstructorIngredient } from '@utils-types';

export const getConstructorItems = (state: RootState) =>
  state.burgerConstructor;
export const getBun = (state: RootState) => state.burgerConstructor.bun;
export const getIngredients = (state: RootState) =>
  state.burgerConstructor.ingredients;

export const getTotalPrice = (state: RootState) => {
  const { bun, ingredients } = state.burgerConstructor;
  const bunPrice = bun ? bun.price * 2 : 0;
  const ingredientsPrice = ingredients.reduce(
    (sum: number, item: TConstructorIngredient) => sum + item.price,
    0
  );
  return bunPrice + ingredientsPrice;
};
