import React, { FC } from 'react';
import { BurgerIngredientsUI } from '@ui';
import { BurgerConstructorUI } from '@ui';
import { TTabMode, TIngredient } from '@utils-types';
import { BurgerConstructorUIProps } from '../../burger-constructor/type';

type ConstructorPageUIProps = {
  ingredientsLoading: boolean;
  burgerIngredientsProps: {
    currentTab: TTabMode;
    buns: TIngredient[];
    mains: TIngredient[];
    sauces: TIngredient[];
    titleBunRef: React.RefObject<HTMLHeadingElement>;
    titleMainRef: React.RefObject<HTMLHeadingElement>;
    titleSaucesRef: React.RefObject<HTMLHeadingElement>;
    bunsRef: (node?: Element | null | undefined) => void;
    mainsRef: (node?: Element | null | undefined) => void;
    saucesRef: (node?: Element | null | undefined) => void;
    onTabClick: (val: string) => void;
  };
  burgerConstructorProps: BurgerConstructorUIProps;
};

export const ConstructorPageUI: FC<ConstructorPageUIProps> = ({
  ingredientsLoading,
  burgerIngredientsProps,
  burgerConstructorProps
}) => {
  if (ingredientsLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <main className='containerMain'>
      <h1 className='text text_type_main-large mt-10 mb-5 pl-5'>
        Соберите бургер
      </h1>
      <div className='main pl-5 pr-5'>
        <BurgerIngredientsUI
          currentTab={burgerIngredientsProps.currentTab as TTabMode}
          buns={burgerIngredientsProps.buns}
          mains={burgerIngredientsProps.mains}
          sauces={burgerIngredientsProps.sauces}
          titleBunRef={burgerIngredientsProps.titleBunRef}
          titleMainRef={burgerIngredientsProps.titleMainRef}
          titleSaucesRef={burgerIngredientsProps.titleSaucesRef}
          bunsRef={burgerIngredientsProps.bunsRef}
          mainsRef={burgerIngredientsProps.mainsRef}
          saucesRef={burgerIngredientsProps.saucesRef}
          onTabClick={burgerIngredientsProps.onTabClick}
        />
        <BurgerConstructorUI {...burgerConstructorProps} />
      </div>
    </main>
  );
};
