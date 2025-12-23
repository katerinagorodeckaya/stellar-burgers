import { TIngredient, TOrder } from '@utils-types';

export type TOrderInfoUIProps = {
  orderInfo: {
    _id: string;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    ingredients: string[];
    ingredientsInfo: (TIngredient & { count: number })[];
    total: number;
    date: Date;
  };
};
