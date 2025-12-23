import React, { FC, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CurrencyIcon,
  FormattedDate
} from '@zlden/react-developer-burger-ui-components';

import styles from './order-card.module.css';

import { OrderCardUIProps } from './type';
import { OrderStatus } from '@components';

export const OrderCardUI: FC<OrderCardUIProps> = memo(
  ({ orderInfo, maxIngredients, locationState }) => {
    const location = useLocation();

    return (
      <Link
        to={`${orderInfo.number}`}
        relative='path'
        state={locationState}
        className={`p-6 mb-4 mr-2 ${styles.order}`}
      >
        <div className={styles.order_info}>
          <span className='text text_type_digits-default'>
            #{orderInfo.number}
          </span>
          <span className='text text_type_main-default text_color_inactive'>
            <FormattedDate date={orderInfo.date} />
          </span>
        </div>

        <div className={`text text_type_main-medium mt-6 ${styles.order_name}`}>
          {orderInfo.name}
          {location.pathname.startsWith('/profile') && (
            <div className={`mt-2 ${styles.order_status}`}>
              <OrderStatus status={orderInfo.status} />
            </div>
          )}
        </div>

        <div className={`mt-6 ${styles.order_content}`}>
          <div className={styles.ingredients}>
            {orderInfo.ingredientsToShow.map((ingredient, index) => (
              <div
                key={index}
                className={styles.img_wrap}
                style={{ zIndex: maxIngredients - index }}
              >
                <img
                  src={ingredient.image_mobile}
                  alt={ingredient.name}
                  className={styles.img}
                />
                {index === maxIngredients - 1 && orderInfo.remains > 0 && (
                  <div className={styles.remains}>
                    <span className='text text_type_main-default'>
                      +{orderInfo.remains}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={styles.order_total}>
            <span className='text text_type_digits-default mr-2'>
              {orderInfo.total}
            </span>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </Link>
    );
  }
);
