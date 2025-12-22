import { combineReducers } from 'redux';
import ingredientsReducer from './slices/ingredientsSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import orderReducer from './slices/orderSlice';
import authReducer from './slices/authSlice';
import feedReducer from './slices/feedSlice';
import profileOrdersReducer from './slices/profileOrdersSlice';

describe('Root Reducer', () => {
  it('should combine all reducers correctly', () => {
    const rootReducer = combineReducers({
      ingredients: ingredientsReducer,
      burgerConstructor: burgerConstructorReducer,
      order: orderReducer,
      auth: authReducer,
      feed: feedReducer,
      profileOrders: profileOrdersReducer
    });

    const initialState = rootReducer(undefined as any, {
      type: 'UNKNOWN_ACTION'
    });

    expect(initialState).toEqual({
      ingredients: {
        ingredients: [],
        loading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      order: {
        orderNumber: null,
        loading: false,
        error: null
      },
      auth: {
        user: null,
        loading: false,
        error: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        loading: false,
        error: null
      },
      profileOrders: {
        orders: [],
        loading: false,
        error: null
      }
    });
  });

  it('should return correct initial state for each slice', () => {
    const rootReducer = combineReducers({
      ingredients: ingredientsReducer,
      burgerConstructor: burgerConstructorReducer,
      order: orderReducer,
      auth: authReducer,
      feed: feedReducer,
      profileOrders: profileOrdersReducer
    });

    const state = rootReducer(undefined as any, { type: 'UNKNOWN_ACTION' });

    // Проверяем каждый слайс отдельно с явным приведением типа
    expect((state as any).ingredients).toEqual({
      ingredients: [],
      loading: false,
      error: null
    });

    expect((state as any).burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });

    expect((state as any).order).toEqual({
      orderNumber: null,
      loading: false,
      error: null
    });

    expect((state as any).auth).toEqual({
      user: null,
      loading: false,
      error: null
    });

    expect((state as any).feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      loading: false,
      error: null
    });

    expect((state as any).profileOrders).toEqual({
      orders: [],
      loading: false,
      error: null
    });
  });
});
