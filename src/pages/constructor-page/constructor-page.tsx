import { useSelector, useDispatch } from '../../services/store';
import { useEffect, useRef, useState, useCallback } from 'react';
import { TIngredient, TTabMode } from '@utils-types';
import styles from './constructor-page.module.css';
import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import {
  getIngredients,
  getIngredientsLoading
} from '../../services/selectors';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  const isIngredientsLoading = useSelector(getIngredientsLoading);
  const ingredients = useSelector(getIngredients);


  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsElement, setBunsElement] = useState<HTMLUListElement | null>(null);
  const [mainsElement, setMainsElement] = useState<HTMLUListElement | null>(
    null
  );
  const [saucesElement, setSaucesElement] = useState<HTMLUListElement | null>(
    null
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);


  const buns = ingredients.filter((item: TIngredient) => item.type === 'bun');
  const mains = ingredients.filter((item: TIngredient) => item.type === 'main');
  const sauces = ingredients.filter(
    (item: TIngredient) => item.type === 'sauce'
  );

 
  const bunsRef = useCallback((node?: Element | null | undefined) => {
    setBunsElement(node as HTMLUListElement | null);
  }, []);

  const mainsRef = useCallback((node?: Element | null | undefined) => {
    setMainsElement(node as HTMLUListElement | null);
  }, []);

  const saucesRef = useCallback((node?: Element | null | undefined) => {
    setSaucesElement(node as HTMLUListElement | null);
  }, []);

 
  const handleTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);

    switch (tab) {
      case 'bun':
        titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'main':
        titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'sauce':
        titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  };

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients
              currentTab={currentTab}
              buns={buns}
              mains={mains}
              sauces={sauces}
              titleBunRef={titleBunRef}
              titleMainRef={titleMainRef}
              titleSaucesRef={titleSaucesRef}
              bunsRef={bunsRef}
              mainsRef={mainsRef}
              saucesRef={saucesRef}
              onTabClick={handleTabClick}
            />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
