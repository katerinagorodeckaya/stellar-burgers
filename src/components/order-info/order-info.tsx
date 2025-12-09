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
  const [error, setError] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<TOrder | null>(null);

  // Эффект для загрузки заказа
  useEffect(() => {
    const fetchOrder = async () => {
      if (!number) return;

      setLoading(true);
      setError(null);
      try {
        let order: TOrder | undefined;

        const isModal = location.state?.background;

        if (isModal) {
          if (location.pathname.includes('/feed')) {
            order = feedOrders.find(
              (item: TOrder) => item.number === parseInt(number)
            );
          } else if (location.pathname.includes('/profile/orders')) {
            order = profileOrders.find(
              (item: TOrder) => item.number === parseInt(number)
            );
          }
        }

        if (!order || !isModal) {
          const response = await getOrderByNumberApi(parseInt(number));
          if (response.success && response.orders.length > 0) {
            order = response.orders[0];
          }
        }

        if (order) {
          setOrderData(order);
        } else {
          setError('Заказ не найден');
          setOrderData(null);
        }
      } catch (error) {
        setError('Ошибка при загрузке заказа');
        setOrderData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [number, feedOrders, profileOrders, location.pathname, location.state]);

  // Эффект для формирования orderInfo когда есть и заказ и ингредиенты
  useEffect(() => {
    if (orderData && ingredients.length > 0) {
      const ingredientsInfo: {
        [key: string]: TIngredient & { count: number };
      } = {};

      orderData.ingredients.forEach((ingredientId: string) => {
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
        ...orderData,
        ingredientsInfo,
        total,
        date: new Date(orderData.createdAt)
      };

      setOrderInfo(orderWithInfo);
    }
  }, [orderData, ingredients]);

  // Показываем прелоадер только если загружаем заказ ИЛИ ждем ингредиенты
  if (loading || (orderData && ingredients.length === 0)) {
    return <Preloader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!orderInfo) {
    return <div>Заказ не найден</div>;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
