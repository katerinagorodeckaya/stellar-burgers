import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems, onRemove, onMoveUp, onMoveDown }) => {
    const handleMoveDown = () => {
      if (onMoveDown) {
        onMoveDown(index);
      }
    };

    const handleMoveUp = () => {
      if (onMoveUp) {
        onMoveUp(index);
      }
    };

    const handleClose = () => {
      if (onRemove) {
        onRemove(ingredient.id);
      }
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
