import React, { FC, memo } from 'react';
import { Tab } from '@zlden/react-developer-burger-ui-components';
import { BurgerIngredientsUIProps } from '../ui/burger-ingredients/type';
import { IngredientsCategory } from '@components';

export const BurgerIngredientsUI: FC<BurgerIngredientsUIProps> = memo(
  ({
    currentTab,
    buns,
    mains,
    sauces,
    titleBunRef,
    titleMainRef,
    titleSaucesRef,
    bunsRef,
    mainsRef,
    saucesRef,
    onTabClick
  }) => (
    <section className='burger_ingredients'>
      <nav>
        <ul className='menu'>
          <Tab value='bun' active={currentTab === 'bun'} onClick={onTabClick}>
            Булки
          </Tab>
          <Tab value='main' active={currentTab === 'main'} onClick={onTabClick}>
            Начинки
          </Tab>
          <Tab
            value='sauce'
            active={currentTab === 'sauce'}
            onClick={onTabClick}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <div className='content'>
        <IngredientsCategory
          title='Булки'
          titleRef={titleBunRef}
          ingredients={buns}
          ref={bunsRef}
        />
        <IngredientsCategory
          title='Начинки'
          titleRef={titleMainRef}
          ingredients={mains}
          ref={mainsRef}
        />
        <IngredientsCategory
          title='Соусы'
          titleRef={titleSaucesRef}
          ingredients={sauces}
          ref={saucesRef}
        />
      </div>
    </section>
  )
);

BurgerIngredientsUI.displayName = 'BurgerIngredientsUI';
