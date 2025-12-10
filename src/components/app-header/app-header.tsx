import React, { FC } from 'react';
import styles from '../ui/app-header/app-header.module.css';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getUser } from '../../services/selectors/authSelectors';

export const AppHeaderUI: FC = () => {
  const user = useSelector(getUser);

  const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.link_active}` : styles.link;

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink to='/' className={setActive} end>
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2 mr-10'>
                  Конструктор
                </p>
              </>
            )}
          </NavLink>
          <NavLink to='/feed' className={setActive}>
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2'>
                  Лента заказов
                </p>
              </>
            )}
          </NavLink>
        </div>
        <div className={styles.logo}>
          <NavLink to='/'>
            <Logo className='' />
          </NavLink>
        </div>
        <div className={styles.link_position_last}>
          <NavLink to='/profile' className={setActive}>
            {({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2'>
                  {user?.name || 'Личный кабинет'}
                </p>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default AppHeaderUI;
