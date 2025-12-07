import { Navigate, useLocation } from 'react-router-dom';
import { FC, ReactElement } from 'react';
import { useSelector } from '../../services/store';
import {
  getUser,
  getAuthLoading
} from '../../services/selectors/authSelectors';
import { Preloader } from '@ui';

type TProtectedRoute = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute: FC<TProtectedRoute> = ({
  onlyUnAuth,
  children
}) => {
  const user = useSelector(getUser);
  const loading = useSelector(getAuthLoading);
  const location = useLocation();

  if (loading) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
