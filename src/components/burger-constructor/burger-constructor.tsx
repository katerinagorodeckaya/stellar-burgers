import React, { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { BurgerConstructorUI } from '../ui/burger-constructor';
import { TConstructorIngredient } from '@utils-types';
import { useNavigate } from 'react-router-dom';
import {
  getConstructorItems,
  getTotalPrice
} from '../../services/selectors/burgerConstructorSelectors';
import {
  getOrderNumber,
  getOrderLoading
} from '../../services/selectors/orderSelectors';
import { getUser } from '../../services/selectors/authSelectors';
import { createOrder, clearOrder } from '../../services/slices/orderSlice';
import {
  clearConstructor,
  removeIngredient,
  moveIngredient
} from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(getConstructorItems);
  const price = useSelector(getTotalPrice);
  const orderNumber = useSelector(getOrderNumber);
  const orderRequest = useSelector(getOrderLoading);
  const user = useSelector(getUser);

  const handleOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun) {
      alert('Выберите булку!');
      return;
    }

    if (constructorItems.ingredients.length === 0) {
      alert('Добавьте начинку!');
      return;
    }

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (item: TConstructorIngredient) => item._id
      ),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientIds))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      })
      .catch((error: any) => {});
  };

  const handleRemoveIngredient = (id: string) => {
    dispatch(removeIngredient(id));
  };

  const handleMoveIngredient = (from: number, to: number) => {
    dispatch(moveIngredient({ from, to }));
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      handleMoveIngredient(index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < constructorItems.ingredients.length - 1) {
      handleMoveIngredient(index, index + 1);
    }
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  return (
    <BurgerConstructorUI
      constructorItems={constructorItems}
      orderRequest={orderRequest}
      price={price}
      orderModalData={orderNumber}
      onOrderClick={handleOrderClick}
      closeOrderModal={closeOrderModal}
      onRemove={handleRemoveIngredient}
      onMoveUp={handleMoveUp}
      onMoveDown={handleMoveDown}
    />
  );
};
