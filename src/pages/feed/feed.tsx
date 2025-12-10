import { FC, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedSlice';
import {
  getFeedOrders,
  getFeedLoading,
  getFeedError
} from '../../services/selectors/feedSelectors';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getFeedOrders);
  const loading = useSelector(getFeedLoading);
  const error = useSelector(getFeedError);

  const handleGetFeeds = useCallback(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  useEffect(() => {
    handleGetFeeds();
  }, [handleGetFeeds]);

  if (loading && orders.length === 0) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
