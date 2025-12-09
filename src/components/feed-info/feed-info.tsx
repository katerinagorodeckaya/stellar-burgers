import { FC, useMemo } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import {
  getFeedOrders,
  getFeedTotal,
  getFeedTotalToday
} from '../../services/selectors';

export const FeedInfo: FC = () => {
  const orders = useSelector(getFeedOrders);
  const total = useSelector(getFeedTotal);
  const totalToday = useSelector(getFeedTotalToday);

  const readyOrders = useMemo(
    () =>
      orders
        .filter((item: TOrder) => item.status === 'done')
        .map((item: TOrder) => item.number)
        .slice(0, 20),
    [orders]
  );

  const pendingOrders = useMemo(
    () =>
      orders
        .filter((item: TOrder) => item.status === 'pending')
        .map((item: TOrder) => item.number)
        .slice(0, 20),
    [orders]
  );

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total, totalToday }}
    />
  );
};
