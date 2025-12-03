import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';

import { IngredientDetailsUI } from '../ui/ingredient-details';
import { TIngredient } from '@utils-types';
import { getIngredients } from '../../services/selectors';
import { Preloader } from '../ui';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(getIngredients);
  const [ingredient, setIngredient] = useState<TIngredient | null>(null);

  useEffect(() => {
    if (ingredients.length > 0 && id) {
      const foundIngredient = ingredients.find(
        (item: TIngredient) => item._id === id
      );
      setIngredient(foundIngredient || null);
    }
  }, [ingredients, id]);

  if (!ingredient) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredient} />;
};
