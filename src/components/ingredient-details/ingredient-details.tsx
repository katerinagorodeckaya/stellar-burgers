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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Сбрасываем loading когда ингредиенты загружены
    if (ingredients.length > 0) {
      setLoading(false);
    }
  }, [ingredients]);

  if (loading) {
    return <Preloader />;
  }

  if (ingredients.length === 0) {
    return <div>Ингредиенты не загружены</div>;
  }

  const ingredient = ingredients.find((item: TIngredient) => item._id === id);

  if (!ingredient) {
    return <div>Ингредиент не найден</div>;
  }

  return <IngredientDetailsUI ingredientData={ingredient} />;
};
