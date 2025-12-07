import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { useLocation } from 'react-router-dom';

import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { getIngredients } from '../../services/selectors';
import { getFeedOrders } from '../../services/selectors/feedSelectors';
import { getProfileOrders } from '../../services/selectors/profileOrdersSelectors';
import { Preloader } from '../ui';
import { getOrderByNumberApi } from '@api';

type TOrderWithIngredients = TOrder & {
  ingredientsInfo: { [key: string]: TIngredient & { count: number } };
  total: number;
  date: Date;
};

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const location = useLocation();
  const ingredients = useSelector(getIngredients);
  const feedOrders = useSelector(getFeedOrders);
  const profileOrders = useSelector(getProfileOrders);
  const [orderInfo, setOrderInfo] = useState<TOrderWithIngredients | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!number) return;

      setLoading(true);
      try {
        let order: TOrder | undefined;

        if (location.pathname.includes('/feed')) {
          order = feedOrders.find(
            (item: TOrder) => item.number === parseInt(number)
          );
        } else if (location.pathname.includes('/profile/orders')) {
          order = profileOrders.find(
            (item: TOrder) => item.number === parseInt(number)
          );
        }

        if (!order) {
          const response = await getOrderByNumberApi(parseInt(number));
          if (response.success && response.orders.length > 0) {
            order = response.orders[0];
          }
        }

        if (order && ingredients.length > 0) {
          const ingredientsInfo: {
            [key: string]: TIngredient & { count: number };
          } = {};

          order.ingredients.forEach((ingredientId: string) => {
            const ingredient = ingredients.find(
              (item: TIngredient) => item._id === ingredientId
            );
            if (ingredient) {
              if (ingredientsInfo[ingredientId]) {
                ingredientsInfo[ingredientId].count += 1;
              } else {
                ingredientsInfo[ingredientId] = { ...ingredient, count: 1 };
              }
            }
          });

          const total = Object.values(ingredientsInfo).reduce(
            (sum: number, item: TIngredient & { count: number }) =>
              sum + item.price * item.count,
            0
          );

          const orderWithInfo: TOrderWithIngredients = {
            ...order,
            ingredientsInfo,
            total,
            date: new Date(order.createdAt)
          };

          setOrderInfo(orderWithInfo);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [number, ingredients, feedOrders, profileOrders, location.pathname]);

  if (loading) {
    return <Preloader />;
  }

  if (!orderInfo) {
    return <div>Заказ не найден</div>;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
