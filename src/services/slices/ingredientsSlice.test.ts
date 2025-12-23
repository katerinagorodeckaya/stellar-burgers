import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice reducer', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  const mockIngredients: TIngredient[] = [
    {
      _id: '60d3b41abdacab0026a733c6',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'image_url',
      image_large: 'image_large_url',
      image_mobile: 'image_mobile_url'
    },
    {
      _id: '60d3b41abdacab0026a733c7',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'image_url',
      image_large: 'image_large_url',
      image_mobile: 'image_mobile_url'
    }
  ];

  it('should return the initial state', () => {
    const state = ingredientsReducer(initialState, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      ingredients: [],
      loading: true,
      error: null
    });
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      ingredients: mockIngredients,
      loading: false,
      error: null
    });
  });

  it('should handle fetchIngredients.rejected', () => {
    const errorMessage = 'Failed to fetch ingredients';
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      ingredients: [],
      loading: false,
      error: errorMessage
    });
  });

  it('should handle fetchIngredients.rejected with default message', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: {}
    };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      ingredients: [],
      loading: false,
      error: 'Ошибка при загрузке ингредиентов'
    });
  });
});
