import React, { FC, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerIngredientUI } from '../ui/burger-ingredient';
import { TBurgerIngredientProps } from './type';

import {
  addBun,
  addIngredient
} from '../../services/slices/burgerConstructorSlice';
import { TIngredient } from '@utils-types';
import { getConstructorItems } from '../../services/selectors/burgerConstructorSelectors';

export const BurgerIngredient: FC<TBurgerIngredientProps> = ({
  ingredient
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { bun, ingredients } = useSelector(getConstructorItems);

  const count = useMemo(() => {
    if (ingredient.type === 'bun') {
      return bun && bun._id === ingredient._id ? 2 : 0;
    } else {
      return ingredients.filter(
        (item: TConstructorIngredient) => item._id === ingredient._id
      ).length;
    }
  }, [ingredient, bun, ingredients]);

  const handleAdd = () => {
    if (ingredient.type === 'bun') {
      dispatch(addBun(ingredient));
    } else {
      dispatch(addIngredient(ingredient));
    }
  };
  const handleClick = () => {
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location }
    });
  };

  return (
    <BurgerIngredientUI
      ingredient={ingredient}
      count={count}
      handleAdd={handleAdd}
      locationState={{ background: location }}
    />
  );
};
