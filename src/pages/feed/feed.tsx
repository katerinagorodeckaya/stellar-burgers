import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedSlice';
import {
  getFeedOrders,
  getFeedLoading,
  getFeedTotal,
  getFeedTotalToday,
  getFeedError
} from '../../services/selectors';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(getFeedOrders);
  const total = useSelector(getFeedTotal);
  const totalToday = useSelector(getFeedTotalToday);
  const loading = useSelector(getFeedLoading);
  const error = useSelector(getFeedError);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (loading && orders.length === 0) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className='text text_type_main-default p-10'>Ошибка: {error}</div>
    );
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
