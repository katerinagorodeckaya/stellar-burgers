import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchProfileOrders } from '../../services/slices/profileOrdersSlice';
import {
  getProfileOrders,
  getProfileOrdersLoading,
  getProfileOrdersError
} from '../../services/selectors';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getProfileOrders);
  const loading = useSelector(getProfileOrdersLoading);
  const error = useSelector(getProfileOrdersError);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  if (loading && orders.length === 0) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className='text text_type_main-default p-10'>Ошибка: {error}</div>
    );
  }

  return <ProfileOrdersUI orders={orders} />;
};
