import burgerConstructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './burgerConstructorSlice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

describe('burgerConstructorSlice reducer', () => {
  const mockIngredient: TIngredient = {
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
  };

  const mockFilling: TIngredient = {
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
  };

  const initialState = {
    bun: null,
    ingredients: []
  };

  it('should return the initial state', () => {
    const state = burgerConstructorReducer(initialState, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  describe('addBun action', () => {
    it('should handle adding a bun', () => {
      const state = burgerConstructorReducer(
        initialState,
        addBun(mockIngredient)
      );
      expect(state.bun).toEqual(mockIngredient);
      expect(state.ingredients).toEqual([]);
    });

    it('should replace existing bun when adding new one', () => {
      const newBun: TIngredient = {
        ...mockIngredient,
        _id: '60d3b41abdacab0026a733c8',
        name: 'Флюоресцентная булка R2-D3'
      };

      const stateWithBun = burgerConstructorReducer(
        initialState,
        addBun(mockIngredient)
      );
      const state = burgerConstructorReducer(stateWithBun, addBun(newBun));

      expect(state.bun).toEqual(newBun);
      expect(state.ingredients).toEqual([]);
    });
  });

  describe('addIngredient action', () => {
    it('should handle adding an ingredient with generated id', () => {
      const action = addIngredient(mockFilling);
      const state = burgerConstructorReducer(initialState, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toMatchObject({
        ...mockFilling,
        id: expect.any(String)
      });
      expect(state.bun).toBeNull();
    });

    it('should add multiple ingredients', () => {
      let state = burgerConstructorReducer(
        initialState,
        addIngredient(mockFilling)
      );

      const secondFilling: TIngredient = {
        ...mockFilling,
        _id: '60d3b41abdacab0026a733c8',
        name: 'Соус Spicy-X'
      };

      state = burgerConstructorReducer(state, addIngredient(secondFilling));

      expect(state.ingredients).toHaveLength(2);
      expect(state.ingredients[0]).toMatchObject({
        ...mockFilling,
        id: expect.any(String)
      });
      expect(state.ingredients[1]).toMatchObject({
        ...secondFilling,
        id: expect.any(String)
      });
    });
  });

  describe('removeIngredient action', () => {
    it('should handle removing an ingredient by id', () => {
      let state = burgerConstructorReducer(
        initialState,
        addIngredient(mockFilling)
      );
      const ingredientId = state.ingredients[0].id;

      state = burgerConstructorReducer(state, removeIngredient(ingredientId));

      expect(state.ingredients).toHaveLength(0);
    });

    it('should not remove ingredient if id does not match', () => {
      let state = burgerConstructorReducer(
        initialState,
        addIngredient(mockFilling)
      );
      const originalLength = state.ingredients.length;

      state = burgerConstructorReducer(state, removeIngredient('wrong-id'));

      expect(state.ingredients).toHaveLength(originalLength);
    });
  });

  describe('moveIngredient action', () => {
    it('should move ingredient from one position to another', () => {
      const ingredients = [
        { ...mockFilling, id: '1' },
        { ...mockFilling, _id: '60d3b41abdacab0026a733c8', id: '2' },
        { ...mockFilling, _id: '60d3b41abdacab0026a733c9', id: '3' }
      ];

      const state = {
        bun: null,
        ingredients
      };

      const newState = burgerConstructorReducer(
        state,
        moveIngredient({ from: 0, to: 2 })
      );

      expect(newState.ingredients[0].id).toBe('2');
      expect(newState.ingredients[1].id).toBe('3');
      expect(newState.ingredients[2].id).toBe('1');
    });

    it('should handle moving ingredient up', () => {
      const ingredients = [
        { ...mockFilling, id: '1' },
        { ...mockFilling, _id: '60d3b41abdacab0026a733c8', id: '2' }
      ];

      const state = {
        bun: null,
        ingredients
      };

      const newState = burgerConstructorReducer(
        state,
        moveIngredient({ from: 1, to: 0 })
      );

      expect(newState.ingredients[0].id).toBe('2');
      expect(newState.ingredients[1].id).toBe('1');
    });
  });

  describe('clearConstructor action', () => {
    it('should clear all ingredients and bun', () => {
      let state = burgerConstructorReducer(
        initialState,
        addBun(mockIngredient)
      );
      state = burgerConstructorReducer(state, addIngredient(mockFilling));

      state = burgerConstructorReducer(state, clearConstructor());

      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(0);
    });
  });
});
