import { Navigate, useLocation } from 'react-router-dom';
import { FC, ReactElement } from 'react';
import { useSelector } from '../../services/store';
import { getUser } from '../../services/selectors/authSelectors';

type TProtectedRoute = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute: FC<TProtectedRoute> = ({
  onlyUnAuth,
  children
}) => {
  const user = useSelector(getUser);
  const location = useLocation();

  
  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }


  return children;
};
